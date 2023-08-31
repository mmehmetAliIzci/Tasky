## What is this cod

Nothing unusual here. Classic BE concept with Models, routes and services =>  We have model that represents our desired structure on what to store, controllers that does all the alterations and inserts to the db, and routes that expose our services to world wide web.

Here is how you can walk through the BE repository:

1) Check models and understand our data structure. You will see that there is only one model called Tasks. My first iteration was creating Person and Tasks models. But i’ve realized only thing we need to store in Tasks was the id’s of the users. So this means we dont need Person model at all.

2) Next go to controllers. Here are all the operations that i’ve created for our system to work. ITs not bullet proof but there are most common error handling to make sure user is using our be correctly and not all the data passed through. These methods are basic CRUD operations on mongodb. Make sure you understand this code since this will handle all the database logic and alterations.

3) Head to routers and check the routes that are exposed via express from BE. 

4) on services you can find the connector that connects us to mongodb and creates the json validations for our collection


## How to run

- `yarn`
- copy `env.template`. Get the connection string from mongodb and if you dont have any database yet, give it a random name. Mongo will take care of the creation of the db since its not there and its on demand.
- `yarn start` will start our server on 8080. But guess what, we want an https server.
- `ssh -o ServerAliveInterval=60 -R be-kumbaya-my-lord-kumbaya:80:localhost:8080 serveo.net`