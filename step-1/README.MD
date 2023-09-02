# Step 1: Initial Setup and Slack Connection

## Overview
This is the stage where we initiate the repository and establish our first connection with Slack.

## How to Run
1. Obtain the necessary credentials for your Slack bot.
2. Install the required packages using the command: `yarn install`
3. To start the development server, run: `yarn start:dev`

In another terminal, execute the following command to forward localhost port 3000 to HTTPS. Feel free to replace "kumbaya-my-lord-kumbaya" with any custom string for a consistent URL:

```
ssh -o ServerAliveInterval=60 -R kumbaya-my-lord-kumbaya:80:localhost:3000 serveo.net
```

## End Result
![end-result](./images/1st.gif)