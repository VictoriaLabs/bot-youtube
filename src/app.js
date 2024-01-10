const socket = require('./socket.js');
const { LiveChat } = require("youtube-chat");

const liveChats = {};

async function startChat(channelId) {
  if (!liveChats[channelId]) {
    const liveChat = new LiveChat({ channelId });

    liveChat.on("start", () => {
      console.log(`Chat for channel ${channelId} started`);
      liveChat.start();
    });

    liveChat.on("end", () => {
      console.log(`Chat for channel ${channelId} ended`);
      liveChat.stop();
      socket.disconnect();
      delete liveChats[channelId];
    });

    liveChat.on("chat", (chatItem) => {
      socket.emitEvent("message", chatItem);
    });

    liveChat.on("error", (error) => {
      console.error(error);
    });

    const ok = await liveChat.start();
    if (!ok) {
      console.log(`Failed to start chat for channel ${channelId}.`);
      return false;
    }

    liveChats[channelId] = liveChat;
    return true;
  } else {
    console.log(`Chat for channel ${channelId} is already running.`);
    return false;
  }
}

async function stopChat(channelId) {
  if (liveChats[channelId]) {
    liveChats[channelId].stop();
    delete liveChats[channelId];
    console.log(`Chat for channel ${channelId} stopped.`);
  } else {
    console.log(`Chat for channel ${channelId} is not running.`);
  }
}

module.exports = { startChat, stopChat };