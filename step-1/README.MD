# STAGE 1 - Bare minimum

This stage of the repository contains the stage where we do an initial connection with slack and consists initilazation of our repository
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


## End Result

![end-result](./images/1st.gif)