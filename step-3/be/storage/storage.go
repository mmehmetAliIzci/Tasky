package storage

import "tasky/web-service-gin/types"

type Storage interface {
	InitDB()
	AddAssignee(name string, assignees []string) (*types.Task, error)
	AddTask(name string, assignees []string) (*types.Task, error)
	RemoveTask(name string) error
	RemoveAssignee(name string, assignee string) (*types.Task, error)
	GetNextAssignee(name string) (string, error)
}
