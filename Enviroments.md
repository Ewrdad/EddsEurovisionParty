# Environments

Listing out how different environments are set up and how to use them.

## Test/Develpopment

### Detection server

Local server running the detection app and hosting ollama, this is where the model will be run and data will be collected. This will be running Windows as it needs to capture the screen and run the app, however it may need to be updated to run ollama as well.

local IP: 192.168.0.242
OS: Windows 10

### Sync server

Local laptop running the same as the frontend server. Same network as detection server. A chromebook with linux emulation.

### Frontend server

Local laptop running the same as sync server. Same network as detection server.
A chromebook with linux emulation.

## Prod

### Prod Detection server

Local server running the detection app and hosting ollama, this is where the model will be run and data will be collected. This will be running Windows as it needs to capture the screen and run the app, however it may need to be updated to run ollama as well.

OS: Windows 10

### Prod Sync server

EC2 instance with Ubuntu server.

### Prod Frontend server

S3+cloudfront hosting the frontend static react app.
