# GO implementation of our BE API

What do we have ?

SOLID

`api` folder for our server initiazation and basicly a handler folder for interacting with DB. It is where our Bussiness logic is. It is there to seperate and keep out the Bussiness logic out of DB logic. This should be the only place where we have bussiness related calls towards api. This is also where we declare our routes.

`storage` folder has a purpose for having an interface where we could easily swap out the DB we are using when it comes to Mongodb or Postgres. We have some methods that every storage must implement with the type of modals we are giving.

`types` where we keep the models and everything db related. 


# Developing 

Make sure `go` is your system. Then run `go main.go` and make sure to change your `.env` file
