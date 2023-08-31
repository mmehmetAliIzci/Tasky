import { Task } from '../../model/Task';

type AddAssigneeResponse = {
  message: string;
  task: Task;
};

export async function addAssignee (
    name: string,
    people?: Array<string>
): Promise<{ taskName?: string; error?: string }> {
    const URL = `${process.env.BE_BASE_URL}/task/add-assignee`;
    let body: { name: string; assignees?: Array<string> } = {
        name,
        assignees: people
    };
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const res = (await response.json()) as AddAssigneeResponse;
            return Promise.resolve({ taskName: res.task.name });
        }
        return Promise.resolve({ error: 'Something went wrong' });
    } catch (e: any) {
        return Promise.resolve({ error: e.error });
    }
}
