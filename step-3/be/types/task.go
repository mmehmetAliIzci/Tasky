package types

type Task struct {
	Name            string   `json:"name"`
	Assignees       []string `json:"assignees"`
	CurrentAssignee string   `json:"currentAssignee"`
	ID              string   `json:"id"`
}


func ValidateTask(task *Task) bool {
	return task.Name != "" && task.ID != ""
}