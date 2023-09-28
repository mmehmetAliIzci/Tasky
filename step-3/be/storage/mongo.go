package storage

import "tasky/web-service-gin/types"

type MongoStorage struct{}

func (s *MongoStorage) GetTaskById(id string) (*types.Task, error) {
	// Connect mongo here
	return nil, nil
}
