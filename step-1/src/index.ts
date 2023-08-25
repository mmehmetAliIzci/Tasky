import { App } from '@slack/bolt';

const getRandomCatUrl = async (): Promise<string> => {
    try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const json = await res.json();
        return json[0].url;
    } catch (error) {
        return 'https://cdn2.thecatapi.com/images/aum.jpg';
    }
};

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('gimmecat', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered]
    // See https://github.com/slackapi/bolt-js/issues/904
    if (
        message.subtype !== 'message_deleted' &&
        message.subtype !== 'message_replied' &&
        message.subtype !== 'message_changed'
    ) {
        const catURL = await getRandomCatUrl();
        console.warn(catURL);
        await say({
            text: 'Here is your fluff',
            blocks: [{
                type: 'image',
                title: {
                    type: 'plain_text',
                    text: 'Damn BOI he thicc'
                },
                alt_text: 'cute cat',
                image_url: catURL
            }]
        });
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
