package main

import (
	"fmt"
	"log"
	"os"
	"tasky/web-service-gin/api"
	"tasky/web-service-gin/config"
	"tasky/web-service-gin/storage"
)

func main() {
	// Load Environment Variables
	config.LoadEnv()

	port := os.Getenv("PORT")

	store := &storage.MongoStorage{}
	store.InitDB()
	server := api.NewServer(port, store)

	fmt.Printf("Starting server on %s\n", port)
	log.Fatal(server.Start())
}
