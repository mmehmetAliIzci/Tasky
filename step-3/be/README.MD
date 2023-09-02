## Step 3: Backend Architecture and Functionality

### Overview

The backend of this project adheres to a classic design pattern involving Models, Controllers, and Routes. Specifically, we've engineered a Task model to meet our data storage requirements, Controllers for database operations, and Routes to expose our services to the web.

### Walkthrough

1) **Models**: Initially, we designed two models: Person and Task. However, upon further analysis, it became clear that the Task model suffices. The Task model solely stores the user IDs, negating the need for the Person model.

2) **Controllers**: This section houses the operations necessary for our system. While not bulletproof, the code includes essential error-handling to ensure correct usage. These methods primarily involve CRUD operations in MongoDB, and understanding them is crucial as they manage all database logic and modifications.

3) **Routes**: Here you can find the routes exposed by the backend via Express.

4) **Services**: This is where the MongoDB database connector resides. This service also defines JSON validation for our collections.

### How to Run

- First, execute `yarn` to install dependencies.
- Copy `env.template` and populate it with the MongoDB connection string. If you haven't yet set up a database, simply name it arbitrarily; MongoDB will create it on-demand.
- Run `yarn start` to initialize the server on port 8080. However, for HTTPS support, proceed to the next step.
- To forward the server to HTTPS, run the following SSH command: 
```
ssh -o ServerAliveInterval=60 -R be-kumbaya-my-lord-kumbaya:80:localhost:8080 serveo.net
```
