import requests
import logging

class SyncClient:
    def __init__(self, base_url="http://localhost:8080", admin_token="development_fallback_token", verify_ssl=True):
        self.base_url = base_url.rstrip('/')
        self.admin_token = admin_token
        self.verify_ssl = verify_ssl
        self.headers = {
            "Authorization": f"Bearer {self.admin_token}",
            "Content-Type": "application/json"
        }
        self.log_cb = None

    def set_verify_ssl(self, verify):
        self.verify_ssl = verify

    def set_log_cb(self, cb):
        self.log_cb = cb

    def _log(self, msg):
        if self.log_cb:
            self.log_cb(msg)

    def update_state(self, **kwargs):
        """
        Updates the sync server state.
        Supports: actId, showId, isLive, message
        """
        payload = {}
        # Mapping Python-style names to API-style names
        mapping = {
            "act_id": "actId",
            "show_id": "showId",
            "is_live": "isLive",
            "message": "message"
        }
        
        for py_key, api_key in mapping.items():
            if py_key in kwargs:
                payload[api_key] = kwargs[py_key]
        
        # Direct support for API keys too
        for api_key in mapping.values():
            if api_key in kwargs:
                payload[api_key] = kwargs[api_key]

        if not payload:
            return False, "Empty payload: No state fields provided"

        self._log(f"POST {self.base_url}/admin/state (SSL Verify: {self.verify_ssl})")
        try:
            response = requests.post(
                f"{self.base_url}/admin/state", 
                json=payload, 
                headers=self.headers, 
                timeout=10,
                verify=self.verify_ssl
            )
            self._log(f"RESPONSE {response.status_code}: {response.text[:200]}")
            if response.status_code == 200:
                return True, response.json()
            elif response.status_code == 401:
                return False, "Unauthorized: Invalid Admin Token"
            else:
                try:
                    err_data = response.json()
                    return False, f"Server Error {response.status_code}: {err_data.get('error', response.text)}"
                except:
                    return False, f"Server Error {response.status_code}: {response.text}"
        except requests.exceptions.SSLError as e:
            self._log(f"ERROR: SSL Certificate Verification Failed: {str(e)}")
            return False, f"SSL Certificate Verification Failed: {str(e)}"
        except requests.exceptions.ConnectionError as e:
            self._log(f"ERROR: Connection Refused: {str(e)}")
            return False, f"Connection Refused: {str(e)}"
        except requests.exceptions.Timeout:
            self._log("ERROR: Request Timed Out")
            return False, "Request Timed Out"
        except Exception as e:
            self._log(f"ERROR: {str(e)}")
            return False, str(e)

    def check_health(self):
        try:
            response = requests.get(f"{self.base_url}/health", timeout=5, verify=self.verify_ssl)
            if response.status_code == 200:
                return True, "OK"
            return False, f"HTTP {response.status_code}"
        except requests.exceptions.ConnectionError:
            return False, "Connection Refused"
        except requests.exceptions.Timeout:
            return False, "Timeout"
        except Exception as e:
            return False, str(e)

    def send_message(self, text, type="info", duration=5000, image_url=None):
        msg = {"text": text, "type": type, "duration": duration}
        if image_url:
            msg["imageUrl"] = image_url
        return self.update_state(message=msg)

    def set_act(self, act_id):
        # We use a dict to allow passing None (null) explicitly
        return self.update_state(act_id=act_id)

    def set_show(self, show_id):
        return self.update_state(show_id=show_id)

    def set_live(self, is_live):
        return self.update_state(is_live=is_live)
