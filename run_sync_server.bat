@echo off
echo Starting Eurovision Sync Server...
cd SyncServer
if not exist node_modules (
    echo Installing dependencies...
    call npm.cmd install
)
if not exist dist (
    echo Building...
    call npm.cmd run build
)
node dist/index.js
pause
