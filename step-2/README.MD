# STAGE 2 - Slash commands

This stage of the repository contains the stage where we create a slash command and properly respond to it via blocks.
### How to run:

Get the necessary credentials for your bot 

```
    yarn install
    yarn start:dev
```

In another terminal run the port forwarding from localhost:3000 to https via serveo. You can change "kumbaya-my-lord-kumbaya" with anything. Its there to get me the same url back every time i request a ssh tunnel.

```
    ssh -o ServerAliveInterval=60 -R kumbaya-my-lord-kumbaya:80:localhost:3000 serveo.net
```