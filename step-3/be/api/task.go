package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Task struct {
	ID              string   `json:"id"`
	Name            string   `json:"name"`
	Assignees       []string `json:"assignees"`
	CurrentAssignee string   `json:"currentAssignee"`
}

var tasks = []Task{
	{ID: "1", Name: "Write documentation", Assignees: []string{"Alice", "Bob"}, CurrentAssignee: "Alice"},
	{ID: "2", Name: "Implement feature X", Assignees: []string{"Charlie", "Dave"}, CurrentAssignee: "Charlie"},
	{ID: "3", Name: "Fix bug Y", Assignees: []string{"Eve", "Frank"}, CurrentAssignee: "Eve"},
}

func (s *Server) handleGetTaskById(context *gin.Context) {
	//s.store.GetTaskById();
	id := context.Param("id")
	for _, task := range tasks {
		if task.ID == id {
			context.IndentedJSON(http.StatusOK, task)
			return
		}
	}
	context.IndentedJSON(http.StatusNotFound, gin.H{"message:": "task not found"})
}

func (s *Server) getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, tasks)
}

func (s *Server) postTask(c *gin.Context) {
	var newTask Task

	if err := c.BindJSON(&newTask); err != nil {
		println(err.Error())
		return
	}

	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)
}
