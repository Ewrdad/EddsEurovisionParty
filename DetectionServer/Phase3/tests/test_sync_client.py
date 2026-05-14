import pytest
from sync_client import SyncClient

def test_sync_client_update_state(mocker):
    mock_post = mocker.patch("requests.post")
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"success": True}

    client = SyncClient(base_url="http://test", admin_token="token")
    success, resp = client.update_state(act_id="sweden")

    assert success is True
    assert resp == {"success": True}
    mock_post.assert_called_once()
    args, kwargs = mock_post.call_args
    assert kwargs["json"] == {"actId": "sweden"}
    assert kwargs["headers"]["Authorization"] == "Bearer token"

def test_sync_client_send_message(mocker):
    mock_post = mocker.patch("requests.post")
    mock_post.return_value.status_code = 200
    
    client = SyncClient()
    client.send_message("Hello", type="warning")
    
    args, kwargs = mock_post.call_args
    assert kwargs["json"]["message"] == {"text": "Hello", "type": "warning", "duration": 5000}

def test_sync_client_health_check(mocker):
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.status_code = 200

    client = SyncClient()
    is_healthy, msg = client.check_health()
    assert is_healthy is True
    assert msg == "OK"    
    mock_get.return_value.status_code = 500
    is_healthy, _ = client.check_health()
    assert is_healthy is False
