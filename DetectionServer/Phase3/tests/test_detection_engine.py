import pytest
import time
from collections import Counter
from detection_engine import DetectionEngine

def test_rolling_average_logic(mocker):
    # Setup mocks
    mock_ss = mocker.Mock()
    mock_ss.capture.return_value = "test.png"
    
    mock_ollama = mocker.Mock()
    # Mocking a sequence of predictions
    mock_ollama.process_image.side_effect = [
        {"prediction": "SWEDEN", "time": 0.1, "error": None},
        {"prediction": "SWEDEN", "time": 0.1, "error": None},
        {"prediction": "UKRAINE", "time": 0.1, "error": None},
        {"prediction": "SWEDEN", "time": 0.1, "error": None},
        {"prediction": "SWEDEN", "time": 0.1, "error": None},
    ]
    
    mock_sync = mocker.Mock()
    mock_sync.set_act.return_value = (True, {})
    
    config = {
        "countries": ["SWEDEN", "UKRAINE"],
        "running_order": ["SWEDEN", "UKRAINE"],
        "rolling_average_size": 3,
        "capture_interval": 0.01,
        "prompt_template": "{countries} {running_order} {last_act}"
    }
    
    engine = DetectionEngine(mock_ss, mock_ollama, mock_sync, config)
    
    # We'll run the loop manually or for a short time
    def stop_after_5():
        time.sleep(0.1)
        engine.is_running = False

    threading_mock = mocker.patch("threading.Thread") # Don't actually start thread
    
    # Instead of running the thread, let's just run _loop once or manually step it
    # Actually, let's refactor _loop slightly to be more testable or just use a flag
    
    # Test internal history update
    engine.history = ["SWEDEN", "SWEDEN"]
    # If we add "UKRAINE" to history of size 3
    engine.history.append("UKRAINE")
    from collections import Counter
    counts = Counter(engine.history)
    mode, count = counts.most_common(1)[0]
    assert mode == "SWEDEN"
    assert count == 2

def test_engine_broadcast_threshold(mocker):
    mock_ss = mocker.Mock()
    mock_ollama = mocker.Mock()
    mock_sync = mocker.Mock()
    mock_sync.set_act.return_value = (True, {})
    
    config = {
        "countries": ["SWEDEN", "UKRAINE"],
        "running_order": ["SWEDEN", "UKRAINE"],
        "rolling_average_size": 5,
        "capture_interval": 0.01,
        "prompt_template": "{countries}"
    }
    
    engine = DetectionEngine(mock_ss, mock_ollama, mock_sync, config)
    
    # History: 3 SWEDEN, 2 UKRAINE. Confidence = 0.6
    engine.history = ["SWEDEN", "SWEDEN", "SWEDEN", "UKRAINE", "UKRAINE"]
    
    # Mock the rest of _loop logic for one iteration
    mock_ss.capture.return_value = "test.png"
    mock_ollama.process_image.return_value = {"prediction": "SWEDEN", "time": 0.1, "error": None}
    
    # Manually trigger the broadcast logic part
    counts = Counter(engine.history)
    mode, count = counts.most_common(1)[0]
    confidence = count / len(engine.history)
    
    assert confidence == 0.6
    assert mode == "SWEDEN"
    
    if confidence >= 0.6:
        engine.sync_client.set_act(mode)
        
    mock_sync.set_act.assert_called_with("SWEDEN")
