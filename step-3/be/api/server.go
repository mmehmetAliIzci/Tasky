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

	router.POST("/task/add", s.AddTask)
	router.POST("/task/remove", s.RemoveTask)
	router.POST("/task/add-assignee", s.AddAssignee)
	router.POST("/task/remove-assignee", s.RemoveAssignee)
	router.POST("/task/next-assignee", s.GetNextAssignee)

	return router.Run(s.listenAddr)
}
