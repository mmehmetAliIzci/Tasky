export async function getNextAssignee (name: string): Promise<{ assignee?: string; error?: string }> {
    const URL = `${process.env.BE_BASE_URL}/task/next-assignee`;
    let body: { name: string } = {
        name
    };
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const res: { message: string; assignee: string } = await response.json();
            console.warn(res);
            return Promise.resolve({ assignee: res.assignee });
        }
        console.warn('Something went wrong');
        return Promise.resolve({ error: 'Something went wrong' });
    } catch (e: any) {
        console.warn('Something went wrong catch');
        return Promise.resolve({ error: e.error });
    }
}
