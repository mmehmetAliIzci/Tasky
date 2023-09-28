package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AddTaskRequest struct {
	Name      string   `json:"name"`
	Assignees []string `json:"assignees"`
}

func (s *Server) AddTask(c *gin.Context) {
	var taskBody AddTaskRequest

	if err := c.ShouldBindJSON(&taskBody); err != nil {
		handleError(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	task, err := s.store.AddTask(taskBody.Name, taskBody.Assignees)
	if err != nil {
		handleError(c, http.StatusInternalServerError, "Failed to add assignee", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated new assignees", "task": task})

}

type RemoveTaskRequest struct {
	Name string `json:"name"`
}

func (s *Server) RemoveTask(c *gin.Context) {
	var request RemoveTaskRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		handleError(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	err := s.store.RemoveTask(request.Name)
	if err != nil {
		handleError(c, http.StatusInternalServerError, "Failed to remove task", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task removed"})
}

type AddAssigneeRequest struct {
	Name      string   `json:"name"`
	Assignees []string `json:"assignees"`
}

func (s *Server) AddAssignee(c *gin.Context) {
	var assigneeBody AddAssigneeRequest

	if err := c.ShouldBindJSON(&assigneeBody); err != nil {
		handleError(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}
	task, err := s.store.AddAssignee(assigneeBody.Name, assigneeBody.Assignees)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Failed to connect DB": err.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated new assignees", "task": task})

}

type RemoveAssigneeRequest struct {
	Name     string `json:"name"`
	Assignee string `json:"assignee"`
}

func (s *Server) RemoveAssignee(c *gin.Context) {
	var request RemoveAssigneeRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		handleError(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	task, err := s.store.RemoveAssignee(request.Name, request.Assignee)
	if err != nil {
		handleError(c, http.StatusInternalServerError, "Failed to remove assignee", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task removed assignees", "task": task})
}

type GetNextAssigneeRequest struct {
	Name string `json:"name"`
}

func (s *Server) GetNextAssignee(c *gin.Context) {
	var request GetNextAssigneeRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		handleError(c, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	response, err := s.store.GetNextAssignee(request.Name)
	if err != nil || response == "" {
		handleError(c, http.StatusInternalServerError, "Failed to get next assignee", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully updated a new task", "assignee": response})
}

// handleError is a helper function to handle errors in a DRY manner
func handleError(c *gin.Context, statusCode int, clientMessage string, err error) {
	log.Printf("Error: %v", err) // Log the internal error message
	c.JSON(statusCode, gin.H{"message": clientMessage, "error": err.Error()})
}
