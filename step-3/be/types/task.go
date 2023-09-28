package types

type Task struct {
	Name            string   `bson:"name"`
	Assignees       []string `bson:"assignees"`
	CurrentAssignee string   `bson:"currentAssignee"`
	ID              string   `bson:"_id,omitempty"`
}

func ValidateTask(task *Task) bool {
	return task.Name != "" && task.ID != ""
}
