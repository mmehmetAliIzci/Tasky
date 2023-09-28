package api

import (
	"tasky/web-service-gin/storage"

	"github.com/gin-gonic/gin"
)

type Server struct {
	listenAddr string
	store      storage.Storage
}

func NewServer(listenAddr string, store storage.Storage) *Server {
	return &Server{listenAddr: listenAddr, store: store}
}

func (s *Server) Start() error {
	router := gin.Default()
	router.GET("/tasks/:id", s.handleGetTaskById)
	router.GET("/tasks", s.getTasks)
	router.POST("/tasks", s.postTask)

	return router.Run(s.listenAddr)
}
