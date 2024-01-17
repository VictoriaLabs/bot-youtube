import { LiveChat } from "youtube-chat";
import * as socket from "./socket.ts";

interface LiveChats {
  [key: string]: LiveChat;
}

const liveChats: LiveChats = {};

class Chat {
  channelId: string;

  constructor(channelId: string) {
    this.channelId = channelId;
  }

  async startChat(): Promise<boolean> {
    if (liveChats[this.channelId]) {
      console.log(`Chat for channel ${this.channelId} is already running.`);
      return false;
    }
    const liveChat = new LiveChat({ channelId: this.channelId });

    liveChat.on("start", () => {
      console.log(`Chat for channel ${this.channelId} started`);
      liveChat.start();
    });

    liveChat.on("end", () => {
      console.log(`Chat for channel ${this.channelId} ended`);
      liveChat.stop();
      socket.disconnect();
      delete liveChats[this.channelId];
    });

    liveChat.on("chat", (chatItem) => {
      socket.emitEvent("message", chatItem);
    });

    liveChat.on("error", (error) => {
      socket.emitEvent("error", "Live not found");
      console.log(error);
    });

    if (!(await liveChat.start())) {
      console.log(`test for ${this.channelId} channel.`);
      return false;
    }

    liveChats[this.channelId] = liveChat;
    return true;
  }

  async stopChat(): Promise<void> {
    if (liveChats[this.channelId]) {
      liveChats[this.channelId].stop();
      delete liveChats[this.channelId];
      console.log(`Chat for channel ${this.channelId} stopped.`);
    } else {
      console.log(`Chat for channel ${this.channelId} is not running.`);
    }
  }

  getChannelId(): string {
    return this.channelId;
  }
}

export { Chat };