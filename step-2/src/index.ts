import { App } from '@slack/bolt';
import { parseTaskCommand } from './commandUtils/parseCommand';

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/tasky', async ({ command, ack, say, client }) => {
    // Acknowledge command request
    await ack();

    try {
        const { operation, nameOfTheTask, users } = parseTaskCommand(command.text);

        switch (operation) {
        case 'create': {
            await say({ text: `task name: ${nameOfTheTask} with create called for user ${users?.[0]}` });
            return;
        }
        case 'remove': {
            await say({ text: 'remove called' });
            return;
        }
        case 'add-assignee': {
            await say({ text: 'add-assignee called' });
            return;
        }
        case 'remove-assignee': {
            await say({ text: 'remove-assignee called' });
            return;
        }
        case 'next': {
            await say({ text: 'next called' });
            return;
        }
        case 'help': {
            await say({ text: 'help called' });
            return;
        }
        default: {
            await say({ text: 'use /tasky help for all commands' });
            return;
        }
        }
    } catch (e: any) {
        await say({ text: 'Error' + e.message });
    }
});

(async () => {
    // Start your app
    try {
        await app.start(process.env.PORT || 3000);
        console.log('⚡️ Bolt app is running!');
    } catch (error) {
        console.error(error);
    }
})();
