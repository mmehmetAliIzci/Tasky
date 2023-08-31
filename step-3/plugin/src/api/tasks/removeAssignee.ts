import { Task } from '../../model/Task';

type RemoveAssigneeResponse = {
  message: string;
  task: Task;
};

export async function removeAssignee (name: string, assignee?: string): Promise<{ taskName?: string; error?: string }> {
    const URL = `${process.env.BE_BASE_URL}/task/remove-assignee`;
    let body: { name: string; assignee?: string } = {
        name,
        assignee
    };
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const res = (await response.json()) as RemoveAssigneeResponse;
            return Promise.resolve({ taskName: res.task.name });
        }
        return Promise.resolve({ error: 'Something went wrong' });
    } catch (e: any) {
        return Promise.resolve({ error: e.error });
    }
}
