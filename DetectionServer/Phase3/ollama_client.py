import ollama
import base64
import time
import json

class OllamaClient:
    def __init__(self, model="gemma2:2b", base_url="http://localhost:11434"):
        self.model = model
        self.client = ollama.Client(host=base_url)

    def set_model(self, model_name):
        self.model = model_name

    def process_image(self, image_path, prompt):
        """Processes an image through the Ollama model."""
        start_time = time.time()
        try:
            with open(image_path, 'rb') as f:
                image_data = f.read()

            response = self.client.generate(
                model=self.model,
                prompt=prompt,
                images=[image_data],
                stream=False,
                options={
                    "temperature": 0.0,
                    "num_predict": 512
                }
            )
            
            # Extract raw text. Reasoning models might put the answer in 'response' 
            # after a long thought process, or sometimes even in the 'thinking' block.
            raw_text = getattr(response, 'response', "") or ""
            thinking_text = getattr(response, 'thinking', "") or ""
            
            raw_text = raw_text.strip()
            thinking_text = thinking_text.strip()
            
            if thinking_text:
                print(f"DEBUG: Model {self.model} is thinking...")
            
            print(f"DEBUG: Model {self.model} raw response: '{raw_text}'")
            
            # If 'response' is empty but we have thinking, maybe the answer is at the end of thinking?
            if not raw_text and thinking_text:
                prediction = thinking_text.upper()
            else:
                prediction = raw_text.upper()
            
            # Clean up reasoning tags if they leaked into the response string
            for tag in ["<THOUGHT>", "</THOUGHT>", "<THINKING>", "</THINKING>"]:
                prediction = prediction.replace(tag, "")
            
            # If the model used tags and put the answer after
            if "</" in prediction:
                prediction = prediction.split(">")[-1].strip()

            processing_time = time.time() - start_time
            return {
                "prediction": prediction,
                "time": processing_time,
                "error": None
            }
        except Exception as e:
            import traceback
            traceback.print_exc()
            return {
                "prediction": "ERROR",
                "time": time.time() - start_time,
                "error": str(e)
            }

    def list_models(self):
        """Returns a list of available models."""
        try:
            response = self.client.list()
            # The response is a ListResponse object which has a 'models' attribute
            # Each model in that list is a Model object with a 'model' attribute (string name)
            return [m.model for m in response.models]
        except Exception as e:
            print(f"Error listing models: {e}")
            return []
