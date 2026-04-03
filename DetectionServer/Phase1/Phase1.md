# Phase 1 Model assesment and data collection

We aim to answer the question of are off the shelf models good enough for our use.
To do this we will create a simple python app that will take a screenshot of a screen and run it through a model, then a user will make it as correct or incorrect(with the correct answer) and we will log the results. This will also generate a dataset that we can use to train our own model if we find that the off the shelf models are not good enough.

## Technologies used

- Python (pktinker)
- OLLAMA hosting LLM models (Mainly assessing Gemma4:e2b but should be flexible to test other models as well)

## Data collection

The app will need to save screenshots and user feedback in such a way it can be used for finetuning a model later on. Research should be done to find the best approach to this and methedology should be written up.

Performance may be usefull to log as well.

## Testing

This shall be tested by watching previous years live streams, however in production this will be used on this years live stream. This can be settup by the user but therefore will need an on off toggle for the processing, and an ignore option which doesnt add it to data collection.

The app should also be able to store and maintain a model performance leaderboard, maintaining an average accurarcy for each model as well as average time taken to process. This should be displayed in the app and updated after each test, as well as be stored so the app can be closed and reopened without losing the data, and so it can continue to be updated over time.

## agent output goals

The model should take a screenshot and a prompt and output one of a hardcoded list of names which will look like the country in all caps, for example "SWEDEN", "NORWAY", "DENMARK" etc. This will be used to identify which act is performing on stage. We may need to use structured out for this.

Since we are training on multiple years of data the list of possible output countries should be easily updated to reflect that years participants.

If no act is performing it should return "NONE"

## Model prompt

the model prompt should include the following information:

1. Instructions of their job (to identify the act performing on stage based on the screenshot)
2. A list of possible outputs (the countries participating that year)
3. Some mock examples (without screenshots)
4. Running order of the show (To help the model understand the context of the show and make better predictions based on the order of the acts)
5. result of last 10 checks (to help the model understand the context of the show and make better predictions based on the order of the acts)

4/5 should be togglable/adjustable as they may be adjusted live. All elements should be easily adjustable as they may need fine human tweaking to get best result

## Ollama infra

Ollama is hosted and run on a local server, the same as the app will be hosted on. With near default settings. The device is running in windows and has 2 monitors, it should capture a monitor (and show an indicator of what monitor is being captured and allow it to be user changed) The server should have python installed however it may need updating.

## Data handling

The git repo is public make sure not to include anything sensitive when uploaded. Make sure data sets/screenshots are in the git ignore as well as ollama config.

## Multi dev

things such as the sync and frontend server are being developed by other agents at the same time so be carefull.
