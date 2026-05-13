import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
from PIL import Image, ImageTk
import json
import os
import threading
import time
from datetime import datetime

from screenshot_manager import ScreenshotManager
from ollama_client import OllamaClient
from data_manager import DataManager
from sync_client import SyncClient
from detection_engine import DetectionEngine

class Phase3App:
    def __init__(self, root):
        self.root = root
        self.root.title("Eurovision Management & Detection (Phase 3)")
        self.root.geometry("1200x900")
        
        # Load Config
        config_path = os.path.join(os.path.dirname(__file__), "config.json")
        with open(config_path, "r") as f:
            self.config = json.load(f)
            
        # Managers
        self.screenshot_mgr = ScreenshotManager(self.config.get("screenshots_dir", "screenshots"))
        self.ollama_client = OllamaClient(
            model=self.config["ollama"]["model"],
            base_url=self.config["ollama"]["base_url"]
        )
        self.sync_client = SyncClient(
            base_url=self.config["sync_server"]["base_url"],
            admin_token=self.config["sync_server"]["admin_token"]
        )
        self.sync_client.set_log_cb(self._log_sync)
        self.engine = DetectionEngine(
            self.screenshot_mgr, 
            self.ollama_client, 
            self.sync_client, 
            {**self.config, **self.config["detection"]}
        )
        
        self._setup_ui()
        self._update_monitors()
        self._update_models()
        self._check_sync_health()

    def _log_sync(self, msg):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.txt_sync_log.config(state="normal")
        self.txt_sync_log.insert(tk.END, f"[{timestamp}] {msg}\n")
        self.txt_sync_log.see(tk.END)
        self.txt_sync_log.config(state="disabled")

    def _setup_ui(self):
        # Main Notebook
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        # --- Tab 1: Detection ---
        self.tab_detection = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_detection, text=" Detection Control ")
        
        self._setup_detection_tab()

        # --- Tab 2: Management ---
        self.tab_management = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_management, text=" Management Interface ")
        
        self._setup_management_tab()

        # --- Tab 3: Configuration ---
        self.tab_config = ttk.Frame(self.notebook)
        self.notebook.add(self.tab_config, text=" Settings ")
        
        self._setup_config_tab()

        # Status Bar
        self.status_bar = ttk.Label(self.root, text="Ready", relief=tk.SUNKEN, anchor=tk.W)
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

    def _setup_detection_tab(self):
        # Left Panel (Preview & Status)
        left_frame = ttk.Frame(self.tab_detection, padding=10)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Preview
        self.preview_label = ttk.Label(left_frame, text="No Preview")
        self.preview_label.pack(pady=10)

        # Stats
        stats_frame = ttk.LabelFrame(left_frame, text="Current Status", padding=10)
        stats_frame.pack(fill=tk.X, pady=10)

        self.lbl_current_act = ttk.Label(stats_frame, text="Detected Act: NONE", font=("Helvetica", 16, "bold"))
        self.lbl_current_act.pack(pady=5)

        self.lbl_confidence = ttk.Label(stats_frame, text="Confidence: 0%")
        self.lbl_confidence.pack(pady=5)

        self.lbl_stable_act = ttk.Label(stats_frame, text="Stable (Rolling): NONE", font=("Helvetica", 12))
        self.lbl_stable_act.pack(pady=5)

        # Sync Log
        sync_log_frame = ttk.LabelFrame(left_frame, text="Sync Server Log", padding=10)
        sync_log_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        self.txt_sync_log = scrolledtext.ScrolledText(sync_log_frame, height=8, state="disabled", font=("Consolas", 9))
        self.txt_sync_log.pack(fill=tk.BOTH, expand=True)

        # Right Panel (Controls & History)
        right_frame = ttk.Frame(self.tab_detection, padding=10)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        # Controls
        ctrl_frame = ttk.LabelFrame(right_frame, text="Controls", padding=10)
        ctrl_frame.pack(fill=tk.X, pady=5)

        ttk.Label(ctrl_frame, text="Monitor:").grid(row=0, column=0, sticky=tk.W)
        self.mon_combo = ttk.Combobox(ctrl_frame, state="readonly")
        self.mon_combo.grid(row=0, column=1, sticky=tk.EW, padx=5)

        self.btn_toggle = ttk.Button(ctrl_frame, text="START DETECTION", command=self._toggle_detection)
        self.btn_toggle.grid(row=1, column=0, columnspan=2, pady=10)

        # History
        hist_frame = ttk.LabelFrame(right_frame, text="Rolling History", padding=10)
        hist_frame.pack(fill=tk.BOTH, expand=True, pady=5)

        self.txt_history = scrolledtext.ScrolledText(hist_frame, height=10, state="disabled")
        self.txt_history.pack(fill=tk.BOTH, expand=True)

    def _setup_management_tab(self):
        # Show Selection & Status
        show_frame = ttk.LabelFrame(self.tab_management, text="Active Show & Status", padding=10)
        show_frame.pack(fill=tk.X, padx=10, pady=5)

        self.show_combo = ttk.Combobox(show_frame, values=[s["name"] for s in self.config["shows"]], state="readonly")
        self.show_combo.pack(side=tk.LEFT, padx=5)
        if self.config["shows"]: self.show_combo.current(0)
        
        ttk.Button(show_frame, text="Set Show", command=self._set_show).pack(side=tk.LEFT, padx=5)

        # Live Toggle
        self.var_is_live = tk.BooleanVar(value=False)
        self.chk_live = ttk.Checkbutton(show_frame, text="GO LIVE", variable=self.var_is_live, command=self._toggle_live)
        self.chk_live.pack(side=tk.RIGHT, padx=20)

        # Message Broadcaster
        msg_frame = ttk.LabelFrame(self.tab_management, text="Broadcast Message", padding=10)
        msg_frame.pack(fill=tk.X, padx=10, pady=5)

        ttk.Label(msg_frame, text="Text:").grid(row=0, column=0, sticky=tk.W)
        self.ent_msg_text = ttk.Entry(msg_frame, width=50)
        self.ent_msg_text.grid(row=0, column=1, padx=5, pady=5, sticky=tk.EW)

        ttk.Label(msg_frame, text="Image URL:").grid(row=1, column=0, sticky=tk.W)
        self.ent_msg_image = ttk.Entry(msg_frame, width=50)
        self.ent_msg_image.grid(row=1, column=1, padx=5, pady=5, sticky=tk.EW)

        ttk.Label(msg_frame, text="Type:").grid(row=2, column=0, sticky=tk.W)
        self.msg_type_combo = ttk.Combobox(msg_frame, values=["info", "success", "warning", "error"], state="readonly")
        self.msg_type_combo.set("info")
        self.msg_type_combo.grid(row=2, column=1, sticky=tk.W, padx=5, pady=5)

        ttk.Button(msg_frame, text="Send Global Message", command=self._send_message).grid(row=3, column=0, columnspan=2, pady=10)
        
        msg_frame.columnconfigure(1, weight=1)

        # Manual Override
        override_frame = ttk.LabelFrame(self.tab_management, text="Manual Act Correction", padding=10)
        override_frame.pack(fill=tk.X, padx=10, pady=5)

        self.var_manual_mode = tk.BooleanVar(value=False)
        self.chk_manual = ttk.Checkbutton(override_frame, text="Manual Mode (Disable Auto-Sync)", variable=self.var_manual_mode, command=self._toggle_manual_mode)
        self.chk_manual.pack(side=tk.TOP, anchor=tk.W, pady=5)

        self.act_override_combo = ttk.Combobox(override_frame, values=["NONE"] + self.config["countries"], state="readonly")
        self.act_override_combo.pack(side=tk.LEFT, padx=5)
        self.act_override_combo.set("NONE")

        ttk.Button(override_frame, text="Override Current Act", command=self._override_act).pack(side=tk.LEFT, padx=5)

    def _setup_config_tab(self):
        # Configuration Editor
        cfg_frame = ttk.LabelFrame(self.tab_config, text="JSON Configuration", padding=10)
        cfg_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.cfg_scroll = scrolledtext.ScrolledText(cfg_frame, wrap=tk.WORD, height=15)
        self.cfg_scroll.pack(fill=tk.BOTH, expand=True)
        self.cfg_scroll.insert(tk.END, json.dumps(self.config, indent=4))
        
        ttk.Button(cfg_frame, text="Save JSON Config", command=self._save_cfg).pack(pady=5)

        # Network Diagnostics
        diag_frame = ttk.LabelFrame(self.tab_config, text="Network Diagnostics", padding=10)
        diag_frame.pack(fill=tk.X, padx=10, pady=5)

        self.lbl_diag_url = ttk.Label(diag_frame, text=f"Sync URL: {self.config['sync_server']['base_url']}")
        self.lbl_diag_url.pack(anchor=tk.W)

        token = self.config['sync_server']['admin_token']
        masked_token = token[:3] + "*" * (len(token) - 3) if len(token) > 3 else "***"
        self.lbl_diag_token = ttk.Label(diag_frame, text=f"Admin Token: {masked_token}")
        self.lbl_diag_token.pack(anchor=tk.W)

        # SSL Toggle
        self.var_verify_ssl = tk.BooleanVar(value=True)
        self.chk_verify_ssl = ttk.Checkbutton(diag_frame, text="Verify SSL Certificates", variable=self.var_verify_ssl, command=self._toggle_ssl)
        self.chk_verify_ssl.pack(anchor=tk.W, pady=5)

        self.lbl_diag_status = ttk.Label(diag_frame, text="Last Connection Status: Unknown", foreground="blue")
        self.lbl_diag_status.pack(anchor=tk.W)

        ttk.Button(diag_frame, text="Run Connection Test", command=self._run_connection_test).pack(pady=5)

        # Manual Probe
        probe_frame = ttk.LabelFrame(self.tab_config, text="Quick URL Probe", padding=10)
        probe_frame.pack(fill=tk.X, padx=10, pady=5)
        
        ttk.Label(probe_frame, text="Test URL:").grid(row=0, column=0, sticky=tk.W)
        self.ent_probe_url = ttk.Entry(probe_frame)
        self.ent_probe_url.insert(0, "http://localhost:8080")
        self.ent_probe_url.grid(row=0, column=1, sticky=tk.EW, padx=5)
        
        ttk.Button(probe_frame, text="PROBE", command=self._probe_url).grid(row=0, column=2, padx=5)
        probe_frame.columnconfigure(1, weight=1)

    def _probe_url(self):
        url = self.ent_probe_url.get().strip()
        if not url: return
        
        self._log_sync(f"Probing URL: {url}...")
        try:
            import requests
            r = requests.get(f"{url}/health", timeout=5, verify=self.var_verify_ssl.get())
            msg = f"Probe Success! Status: {r.status_code}\nResponse: {r.text[:100]}"
            self._log_sync(f"PROBE SUCCESS: {r.status_code}")
            messagebox.showinfo("Probe Result", msg)
        except Exception as e:
            self._log_sync(f"PROBE FAILED: {str(e)}")
            messagebox.showerror("Probe Failed", f"Error: {str(e)}")

    def _save_cfg(self):
        try:
            new_cfg = json.loads(self.cfg_scroll.get("1.0", tk.END))
            config_path = os.path.join(os.path.dirname(__file__), "config.json")
            with open(config_path, "w") as f:
                json.dump(new_cfg, f, indent=4)
            self.config = new_cfg
            
            # Update diagnostic labels
            self.lbl_diag_url.config(text=f"Sync URL: {self.config['sync_server']['base_url']}")
            token = self.config['sync_server']['admin_token']
            masked_token = token[:3] + "*" * (len(token) - 3) if len(token) > 3 else "***"
            self.lbl_diag_token.config(text=f"Admin Token: {masked_token}")
            
            # Update Client
            self.sync_client.base_url = self.config["sync_server"]["base_url"].rstrip('/')
            self.sync_client.admin_token = self.config["sync_server"]["admin_token"]
            self.sync_client.headers["Authorization"] = f"Bearer {self.sync_client.admin_token}"
            
            messagebox.showinfo("Success", "Configuration saved! Sync Client updated.")
        except Exception as e:
            messagebox.showerror("Error", f"Invalid JSON: {str(e)}")

    def _toggle_ssl(self):
        verify = self.var_verify_ssl.get()
        self.sync_client.set_verify_ssl(verify)
        self._log_sync(f"SSL Verification toggled to: {verify}")

    def _run_connection_test(self):
        self.lbl_diag_status.config(text="Testing...", foreground="orange")
        self.root.update_idletasks()
        
        success, reason = self.sync_client.check_health()
        if success:
            self.lbl_diag_status.config(text=f"Success: {reason}", foreground="green")
            # Try a dummy state update to check token
            s2, r2 = self.sync_client.update_state(is_live=None) # Just a ping
            if s2:
                self.lbl_diag_status.config(text=f"Success: Connection & Auth OK", foreground="green")
            else:
                self.lbl_diag_status.config(text=f"Connection OK, Auth Failed: {r2}", foreground="red")
        else:
            self.lbl_diag_status.config(text=f"Failed: {reason}", foreground="red")
            tips = "\n\nTroubleshooting Tips:\n"
            tips += "1. Check if the SyncServer is actually running.\n"
            tips += "2. Verify the URL and Port (is it 8080 or 443?)\n"
            tips += "3. If running on the same machine, try: http://localhost:8080\n"
            tips += "4. Check for Firewall or Anti-virus blocking the port."
            
            messagebox.showerror("Connection Test Failed", f"Could not connect to {self.config['sync_server']['base_url']}\n\nError: {reason}{tips}")

    # --- Actions ---
    def _update_monitors(self):
        monitors = self.screenshot_mgr.get_monitors()
        self.mon_combo['values'] = [f"Monitor {i}: {m['width']}x{m['height']}" for i, m in enumerate(monitors)]
        if monitors: self.mon_combo.current(0)

    def _update_models(self):
        models = self.ollama_client.list_models()
        if not models:
            self._log_status("Warning: Could not connect to Ollama.")
        
    def _check_sync_health(self):
        success, reason = self.sync_client.check_health()
        if success:
            self._log_status("Connected to Sync Server")
        else:
            self._log_status(f"Warning: Sync Server Offline ({reason})")
        # Check again in 30 seconds
        self.root.after(30000, self._check_sync_health)

    def _log_status(self, msg):
        self.status_bar.config(text=msg)

    def _toggle_detection(self):
        if self.engine.is_running:
            self.engine.stop()
            self.btn_toggle.config(text="START DETECTION")
            self._log_status("Detection Stopped")
        else:
            idx = self.mon_combo.current()
            self.engine.start(idx, status_cb=self._on_engine_status, result_cb=self._on_engine_result)
            self.btn_toggle.config(text="STOP DETECTION")
            self._log_status("Detection Started")

    def _on_engine_status(self, msg):
        self.root.after(0, lambda: self._log_status(msg))

    def _on_engine_result(self, res):
        self.root.after(0, lambda: self._update_ui_with_result(res))

    def _update_ui_with_result(self, res):
        self.lbl_current_act.config(text=f"Detected Act: {res['raw']}")
        self.lbl_stable_act.config(text=f"Stable (Rolling): {res['stable']}")
        self.lbl_confidence.config(text=f"Confidence: {res['confidence']*100:.0f}%")
        
        # Update history text
        self.txt_history.config(state="normal")
        self.txt_history.insert(tk.END, f"[{datetime.now().strftime('%H:%M:%S')}] {res['raw']} (Stable: {res['stable']}, {res['confidence']*100:.0f}%)\n")
        self.txt_history.see(tk.END)
        self.txt_history.config(state="disabled")

        # Update preview
        try:
            img = Image.open(res['path'])
            img.thumbnail((400, 300))
            photo = ImageTk.PhotoImage(img)
            self.preview_label.config(image=photo, text="")
            self.preview_label.image = photo
        except:
            pass

    def _set_show(self):
        show_name = self.show_combo.get()
        show_id = next(s["id"] for s in self.config["shows"] if s["name"] == show_name)
        success, resp = self.sync_client.set_show(show_id)
        if success:
            messagebox.showinfo("Success", f"Show set to {show_name}")
        else:
            messagebox.showerror("Error", f"Failed: {resp}")

    def _toggle_live(self):
        is_live = self.var_is_live.get()
        success, resp = self.sync_client.set_live(is_live)
        if success:
            self._log_status(f"Live status updated to: {is_live}")
        else:
            messagebox.showerror("Error", f"Failed to update live status: {resp}")
            self.var_is_live.set(not is_live) # Revert

    def _send_message(self):
        text = self.ent_msg_text.get()
        image_url = self.ent_msg_image.get()
        mtype = self.msg_type_combo.get()
        if not text: return
        
        success, resp = self.sync_client.send_message(text, type=mtype, image_url=image_url if image_url else None)
        if success:
            self.ent_msg_text.delete(0, tk.END)
            self.ent_msg_image.delete(0, tk.END)
            self._log_status("Message broadcasted!")
        else:
            messagebox.showerror("Error", f"Failed: {resp}")

    def _toggle_manual_mode(self):
        self.engine.manual_mode = self.var_manual_mode.get()
        self._log_status(f"Manual mode: {self.engine.manual_mode}")

    def _override_act(self):
        act = self.act_override_combo.get()
        success, resp = self.sync_client.set_act(None if act == "NONE" else act)
        if success:
            messagebox.showinfo("Success", f"Act manually set to {act}")
            # Also update engine's last broadcast to avoid immediate re-broadcast of something else
            self.engine.last_broadcast_act = act
            self.engine.last_change_time = time.time()
        else:
            messagebox.showerror("Error", f"Failed: {resp}")

if __name__ == "__main__":
    root = tk.Tk()
    app = Phase3App(root)
    root.mainloop()
