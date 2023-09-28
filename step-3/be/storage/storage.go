package storage

import "tasky/web-service-gin/types"

type Storage interface {
	GetTaskById(id string) (*types.Task, error)
}
