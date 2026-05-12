# Phase 3 Management and detection interface

The goal for phase 3 and final phase is to create a detection process based on earlier findings and create a management interface for the website

This comprises of:

1. The Detection Server
2. The management interface
   These should be combined into a single ui

## The Detection server

This is heavily based on the work in phase 1, where we compared model effectivness. Things we can take from that are:

- System Prompt Structure
- Model Connections (ollama, aim for ministral3:8b)
- UI structure.
- Screencapture process

The goal of this is to detect and broadcast to the sync server what the current performing act is.

At its core we want to have a rolling 3/5/7 (Provide opptions in the ui) average of the results picking the most common, this is since we know the model has a 86% accuracy rate. We can also use some heuristics to reduce load such as possibly waiting a minute to start checking just after an act changes etc. Also figure out any statistical ways to make it more accurate.

Please allow for corrections throughout and report to the UI what you are doing constantly.the priority is both speed and accuracy.

## The managment interface

the goal of this is to allow managing the session throughout this should include:

- sending messages to users
- Correcting any wrong information
- Selecting which show is performing.
  and any other features of the sync server.

This should be user friendly and allow maxiumn options
