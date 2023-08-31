export async function removeTask (name: string): Promise<{ message?: string; error?: string }> {
    const URL = `${process.env.BE_BASE_URL}/task/remove`;
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
            const res: { message: string } = await response.json();
            return Promise.resolve({ message: res.message });
        }
        return Promise.resolve({ error: 'Something went wrong' });
    } catch (e: any) {
        return Promise.resolve({ error: e.error });
    }
}
