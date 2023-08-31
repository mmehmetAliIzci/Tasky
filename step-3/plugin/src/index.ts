import { App } from '@slack/bolt';
import { parseTaskCommand } from './commandUtils/parseCommand';
import {
    addAssigneeSuccess,
    addAssigneeUnSuccess,
    createTaskSuccess,
    createTaskUnSuccess,
    helpBlock,
    nextSuccess,
    nextUnSuccess,
    removeAssigneeSuccess,
    removeAssigneeUnSuccess,
    removeTaskSuccess,
    removeTaskUnsuccess
} from './commandUtils/slackBlocks';
import { createTask } from './api/tasks/createTask';
import { removeTask } from './api/tasks/removeTask';
import { addAssignee } from './api/tasks/addAssignee';
import { removeAssignee } from './api/tasks/removeAssignee';
import { getNextAssignee } from './api/tasks/getNextAssignee';

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
            let result = await createTask(nameOfTheTask, users);
            if (result.taskName) {
                await say({ blocks: createTaskSuccess(result.taskName) });
            } else {
                await client.chat.postEphemeral({
                    channel: command.channel_id,
                    user: command.user_id,
                    blocks: createTaskUnSuccess
                });
            }
            break;
        }
        case 'remove': {
            let result = await removeTask(nameOfTheTask);
            if (result.message) {
                await say({ blocks: removeTaskSuccess(nameOfTheTask) });
            } else {
                await client.chat.postEphemeral({
                    channel: command.channel_id,
                    user: command.user_id,
                    blocks: removeTaskUnsuccess(nameOfTheTask)
                });
            }
            break;
        }
        case 'add-assignee': {
            let result = await addAssignee(nameOfTheTask, users);

            if (result.taskName) {
                let userNames = users?.join(' ') ?? '';
                await say({ blocks: addAssigneeSuccess(nameOfTheTask, userNames) });
            } else {
                await client.chat.postEphemeral({
                    channel: command.channel_id,
                    user: command.user_id,
                    blocks: addAssigneeUnSuccess(nameOfTheTask)
                });
            }

            break;
        }
        case 'remove-assignee': {
            let user = users?.[0] ?? '';
            let result = await removeAssignee(nameOfTheTask, user);

            if (result.taskName) {
                await say({ blocks: removeAssigneeSuccess(nameOfTheTask, user) });
            } else {
                await client.chat.postEphemeral({
                    channel: command.channel_id,
                    user: command.user_id,
                    blocks: removeAssigneeUnSuccess(nameOfTheTask)
                });
            }
            break;
        }
        case 'next': {
            let result = await getNextAssignee(nameOfTheTask);
            if (result.assignee) {
                await say({ blocks: nextSuccess(nameOfTheTask, result.assignee) });
            } else {
                await client.chat.postEphemeral({
                    channel: command.channel_id,
                    user: command.user_id,
                    blocks: nextUnSuccess(nameOfTheTask)
                });
            }
            break;
        }
        case 'help': {
            await say({
                blocks: helpBlock
            });
            break;
        }
        default: {
            await say({ text: 'use /tasky help for all commands' });
            break;
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
