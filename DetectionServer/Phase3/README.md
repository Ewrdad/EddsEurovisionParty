# Eurovision Detection Server - Phase 3

This is the final integrated version of the Eurovision Detection Server. It combines real-time screen detection using AI (Ollama) with a management interface for the Eurovision party.

## Features

- **AI Detection**: Uses Ollama (defaulting to `ministral3:8b`) to identify the current act from a live stream.
- **Rolling Average**: Uses a configurable rolling average to improve detection stability.
- **Sync Server Integration**: Automatically broadcasts detected acts to the SyncServer.
- **Management UI**:
  - Set active show (Semi-Finals, Grand Final)
  - Broadcast global messages with optional image URLs
  - Toggle "Live" status
  - Manually override/correct the current act

## How to Run

1. **Prerequisites**:
   - Python 3.10+
   - Ollama installed and running with the `ministral3:8b` model pulled.
   - SyncServer running (default port 8080).

2. **Quick Start**:
   - Double-click `run_detection.bat` in the project root.
   - OR run `python app.py` from this directory (ensure requirements are installed).

3. **Configuration**:
   - Edit `config.json` to change the model, sync server URL, or detection parameters.
   - You can also edit settings directly in the "Settings" tab of the application.

## Requirements

- `requests`
- `pillow`
- `ollama`
- `mss` (for screenshots)
- `tkinter` (usually built-in)
