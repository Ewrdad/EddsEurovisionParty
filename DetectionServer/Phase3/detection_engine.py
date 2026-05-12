import threading
import time
from datetime import datetime
from collections import Counter
import os

class DetectionEngine:
    def __init__(self, screenshot_mgr, ollama_client, sync_client, config):
        self.screenshot_mgr = screenshot_mgr
        self.ollama_client = ollama_client
        self.sync_client = sync_client
        self.config = config
        
        self.is_running = False
        self.history = []
        self.current_act = None
        self.last_broadcast_act = None
        self.detection_thread = None
        
        # UI callback
        self.status_cb = None
        self.result_cb = None

    def start(self, monitor_idx, status_cb=None, result_cb=None):
        self.is_running = True
        self.status_cb = status_cb
        self.result_cb = result_cb
        self.detection_thread = threading.Thread(target=self._loop, args=(monitor_idx,), daemon=True)
        self.detection_thread.start()

    def stop(self):
        self.is_running = False
        if self.detection_thread:
            self.detection_thread.join(timeout=2)

    def _loop(self, monitor_idx):
        rolling_size = self.config.get("rolling_average_size", 5)
        interval = self.config.get("capture_interval", 2) # seconds
        wait_after_change = self.config.get("wait_after_change", 30) # seconds
        
        last_change_time = 0
        
        while self.is_running:
            try:
                # 1. Capture
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"live_{timestamp}.png"
                screenshot_path = self.screenshot_mgr.capture(monitor_idx, filename)
                
                # 2. Process
                countries = ", ".join(self.config["countries"])
                order = ", ".join(self.config["running_order"])
                
                prompt = self.config["prompt_template"].format(
                    countries=countries,
                    running_order=order,
                    last_act=self.last_broadcast_act or "NONE",
                    next_act="UNKNOWN" # We don't strictly know the next one here without more logic
                )
                
                if self.status_cb:
                    self.status_cb(f"Processing image {filename}...")
                
                result = self.ollama_client.process_image(screenshot_path, prompt)
                
                if result.get("error"):
                    prediction = "ERROR"
                    if self.status_cb:
                        self.status_cb(f"Ollama Error: {result['error']}")
                else:
                    prediction = result["prediction"].strip().upper()
                
                # Clean prediction (sometimes model adds "PREDICTION: " prefix)
                if "PREDICTION:" in prediction:
                    prediction = prediction.split("PREDICTION:")[-1].strip()
                
                # Further cleaning: remove common noise
                prediction = prediction.replace(".", "").replace("*", "").strip()
                
                # Validate prediction is in allowed countries
                if prediction not in self.config["countries"] and prediction != "NONE":
                    # Try to find it if it's a partial match or contains the country name
                    found = False
                    for c in self.config["countries"]:
                        # Exact word match to avoid 'UNITED KINGDOM' matching 'UNITED' or similar
                        import re
                        if re.search(rf"\b{re.escape(c)}\b", prediction):
                            prediction = c
                            found = True
                            break
                    if not found:
                        prediction = "UNKNOWN"

                # 3. Rolling Average
                self.history.append(prediction)
                if len(self.history) > rolling_size:
                    self.history.pop(0)
                
                # Pick most common
                counts = Counter(self.history)
                mode, count = counts.most_common(1)[0]
                
                confidence = count / len(self.history)
                
                if self.result_cb:
                    self.result_cb({
                        "raw": prediction,
                        "stable": mode,
                        "confidence": confidence,
                        "history": list(self.history),
                        "time": result["time"],
                        "path": screenshot_path
                    })

                # 4. Logic & Broadcasting
                # We only broadcast if we are confident (e.g. > 60% agreement)
                if confidence >= 0.6 and mode != "UNKNOWN":
                    if mode != self.last_broadcast_act:
                        # NEW ACT DETECTED!
                        if self.status_cb:
                            self.status_cb(f"New act detected: {mode} (Confidence: {confidence:.2f})")
                        
                        success, resp = self.sync_client.set_act(mode)
                        if success:
                            self.last_broadcast_act = mode
                            last_change_time = time.time()
                            if self.status_cb:
                                self.status_cb(f"Broadcasted {mode} to Sync Server.")
                        else:
                            if self.status_cb:
                                self.status_cb(f"Failed to broadcast: {resp}")

                # 5. Heuristics
                current_time = time.time()
                effective_interval = interval
                
                # If we just changed, wait longer (e.g. 1 minute) to reduce load
                # acts are usually ~3 mins, so 1 min is safe.
                if self.last_broadcast_act and (current_time - last_change_time) < wait_after_change:
                    # We are in the "quiet period" after a change
                    # We can either sleep the whole time or just increase interval
                    effective_interval = wait_after_change - (current_time - last_change_time)
                    if self.status_cb:
                        self.status_cb(f"In quiet period after act change. Waiting {effective_interval:.0f}s...")
                
                time.sleep(max(0.1, effective_interval))
                
            except Exception as e:
                if self.status_cb:
                    self.status_cb(f"Error in detection loop: {str(e)}")
                time.sleep(5)
