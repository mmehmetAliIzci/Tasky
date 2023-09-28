package main

import (
	"flag"
	"fmt"
	"log"
	"tasky/web-service-gin/api"
	"tasky/web-service-gin/storage"
)

func main() {
	listenAddr := flag.String("listenaddr", ":3000", "address to listen on")
	flag.Parse()

	store := &storage.MongoStorage{}
	server := api.NewServer(*listenAddr, store)

	fmt.Printf("Starting server on %s\n", *listenAddr)
	log.Fatal(server.Start())
}
