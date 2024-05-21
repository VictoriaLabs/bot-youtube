import { google } from 'googleapis';

async function getChannelData(channelId: string) {
    try {
        const channelResult = await google.youtube('v3').channels.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: ['snippet', 'contentDetails', 'statistics'],
            id: [channelId]
        });

        if (channelResult.data.items && channelResult.data.items.length > 0) {
            const channel = channelResult.data.items[0];
            return {
                name: channel.snippet?.title,
                description: channel.snippet?.description,
                subscriberCount: channel.statistics?.subscriberCount,
                videoCount: channel.statistics?.videoCount,
                viewCount: channel.statistics?.viewCount
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching channel data: ', error);
        throw error;
    }
}

export { getChannelData };
