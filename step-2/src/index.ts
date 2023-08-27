import { App } from '@slack/bolt';
import { parseTaskCommand } from './commandUtils/parseCommand';
import { addAssigneeSuccess, createTaskSuccess, helpBlock, nextSuccess, removeAssigneeSuccess, removeTaskSuccess } from './commandUtils/slackBlocks';

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
            await say({ blocks: createTaskSuccess(nameOfTheTask) });
            return;
        }
        case 'remove': {
            await say({ blocks: removeTaskSuccess(nameOfTheTask) });
            return;
        }
        case 'add-assignee': {
            let userNames = users?.join(' ') ?? '';
            await say({ blocks: addAssigneeSuccess(nameOfTheTask, userNames) });
            return;
        }
        case 'remove-assignee': {
            let userNames = users?.join(' ') ?? '';
            await say({ blocks: removeAssigneeSuccess(nameOfTheTask, userNames) });
            return;
        }
        case 'next': {
            await say({ blocks: nextSuccess(nameOfTheTask, users?.[0] ?? '') });
            return;
        }
        case 'help': {
            await say({
                blocks: helpBlock
            });
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
