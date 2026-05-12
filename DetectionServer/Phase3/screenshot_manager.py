import mss
import mss.tools
from PIL import Image
import os

class ScreenshotManager:
    def __init__(self, output_dir="screenshots"):
        self.sct = mss.mss()
        self.output_dir = output_dir
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def get_monitors(self):
        """Returns a list of monitors."""
        return self.sct.monitors

    def capture(self, monitor_index=1, filename="latest.png"):
        """Captures a screenshot of the specified monitor."""
        if monitor_index < 0 or monitor_index >= len(self.sct.monitors):
            raise ValueError(f"Invalid monitor index: {monitor_index}")

        monitor = self.sct.monitors[monitor_index]
        sct_img = self.sct.grab(monitor)
        
        # Convert to PIL Image
        img = Image.frombytes("RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")
        
        filepath = os.path.join(self.output_dir, filename)
        img.save(filepath)
        return filepath

    def get_preview(self, monitor_index=1, size=(400, 225)):
        """Returns a resized PIL image for preview in GUI."""
        if monitor_index < 0 or monitor_index >= len(self.sct.monitors):
            return None
        
        monitor = self.sct.monitors[monitor_index]
        sct_img = self.sct.grab(monitor)
        img = Image.frombytes("RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")
        img.thumbnail(size)
        return img
