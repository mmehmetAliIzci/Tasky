package service

import "golang.org/x/exp/slices"

func RoundTable(currentAssignee string, assignees []string) string {
	// If the current assignee is not found in the array, return the first element or some default value
	if currentAssignee == "" {
		if len(assignees) > 0 {
			return assignees[0]
		}
		return ""
	}

	// Find the index of the current assignee in the array
	currentIndex := slices.Index(assignees, currentAssignee)

	// If the current assignee is not found in the array, return an empty string or some default value
	if currentIndex == -1 {
		return "" // or some default value
	}

	// Find the index of the next assignee. If the current assignee is the last one, start from the beginning
	nextIndex := (currentIndex + 1) % len(assignees)

	// Return the next assignee
	return assignees[nextIndex]
}
