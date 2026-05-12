@echo off
echo Starting Eurovision Detection Server (Phase 3)...
cd DetectionServer\Phase3
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate
    echo Installing requirements...
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate
)
python app.py
pause
