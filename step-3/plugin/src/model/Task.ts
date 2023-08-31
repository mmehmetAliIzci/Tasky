export interface Task {
  name: string;
  assignees: Array<string>;
  currentAssignee?: string;
}
