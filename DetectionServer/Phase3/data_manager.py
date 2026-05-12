import json
import os
import time
from datetime import datetime

class DataManager:
    def __init__(self, data_dir="data"):
        self.data_dir = data_dir
        self.stats_file = os.path.join(data_dir, "stats.json")
        self.history_file = os.path.join(data_dir, "history.json")
        self.dataset_file = os.path.join(data_dir, "dataset.jsonl")

        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
        
        self.stats = self._load_stats()
        self.history = self._load_history()

    def _load_stats(self):
        """Loads model performance stats."""
        if os.path.exists(self.stats_file):
            with open(self.stats_file, 'r') as f:
                return json.load(f)
        return {}

    def _load_history(self):
        """Loads last 10 results context."""
        if os.path.exists(self.history_file):
            with open(self.history_file, 'r') as f:
                return json.load(f)
        return []

    def save_log(self, model_name, screenshot_path, prediction, actual=None, time_taken=0.0):
        """Logs a test result, updates stats, and 'tags' the screenshot by moving it."""
        is_correct = (prediction == actual) if actual else (prediction is not None and prediction != "ERROR")
        
        # Determine label for folder
        label = actual if actual else prediction
        if not label:
            label = "UNKNOWN"
            
        # Move screenshot to labeled folder for easy training access
        labeled_dir = os.path.join(self.data_dir, "labeled", label)
        if not os.path.exists(labeled_dir):
            os.makedirs(labeled_dir)
            
        new_screenshot_path = os.path.join(labeled_dir, os.path.basename(screenshot_path))
        try:
            if os.path.exists(screenshot_path):
                os.rename(screenshot_path, new_screenshot_path)
            else:
                new_screenshot_path = screenshot_path # Fallback if already moved
        except Exception as e:
            print(f"Error moving file: {e}")
            new_screenshot_path = screenshot_path

        # Update Stats
        if model_name not in self.stats:
            self.stats[model_name] = {"total": 0, "correct": 0, "total_time": 0.0}
        
        self.stats[model_name]["total"] += 1
        self.stats[model_name]["total_time"] += time_taken
        if is_correct and actual: # Only count as correct if we actually have an 'actual' to compare to
            if prediction == actual:
                self.stats[model_name]["correct"] += 1
        
        with open(self.stats_file, 'w') as f:
            json.dump(self.stats, f, indent=4)
        
        # Save Dataset for finetuning
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "model": model_name,
            "screenshot": new_screenshot_path,
            "prediction": prediction,
            "actual": actual,
            "correct": (prediction == actual) if actual else None,
            "time_taken": time_taken
        }
        
        with open(self.dataset_file, 'a') as f:
            f.write(json.dumps(log_entry) + "\n")
            
        # Update History
        # We prioritize 'actual' label as it is the ground truth
        last_successful = actual if actual else prediction
        
        if last_successful and last_successful != "ERROR" and last_successful != "NONE":
            # Avoid adding the same act consecutively (multiple captures for same performance)
            if not self.history or self.history[-1] != last_successful:
                self.history.append(last_successful)
                if len(self.history) > 10:
                    self.history.pop(0)
                
                with open(self.history_file, 'w') as f:
                    json.dump(self.history, f)
        
        return new_screenshot_path

    def get_collection_stats(self):
        """Returns counts of labeled images per country."""
        counts = {}
        labeled_path = os.path.join(self.data_dir, "labeled")
        if os.path.exists(labeled_path):
            for country in os.listdir(labeled_path):
                country_path = os.path.join(labeled_path, country)
                if os.path.isdir(country_path):
                    image_count = len([f for f in os.listdir(country_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
                    counts[country] = image_count
        return counts

    def get_leaderboard(self):
        """Returns stats sorted by accuracy."""
        leaderboard = []
        for model, s in self.stats.items():
            acc = (s["correct"] / s["total"] * 100) if s["total"] > 0 else 0
            avg_time = (s["total_time"] / s["total"]) if s["total"] > 0 else 0
            leaderboard.append({
                "model": model,
                "accuracy": f"{acc:.2f}%",
                "avg_time": f"{avg_time:.2f}s",
                "count": s["total"]
            })
        return sorted(leaderboard, key=lambda x: float(x["accuracy"].replace('%', '')), reverse=True)

    def get_recent_history(self):
        """Returns the last 10 predictions for prompt context."""
        return ", ".join(self.history)

    def get_last_successful_result(self):
        """Returns the single last successful prediction/actual value."""
        return self.history[-1] if self.history else "NONE"
