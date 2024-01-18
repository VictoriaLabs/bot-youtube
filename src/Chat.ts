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

    //start the chat listener on "start" event
    liveChat.on("start", () => {
      console.log(`Chat for channel ${this.channelId} started`);
      liveChat.start();
    });

    //stop the chat listener on "end" event
    liveChat.on("end", () => {
      console.log(`Chat for channel ${this.channelId} ended`);
      liveChat.stop();
      socket.disconnect();
      delete liveChats[this.channelId];
    });

    //emit the message to the server on "chat" event
    liveChat.on("chat", (chatItem) => {
      socket.emitEvent("message", chatItem);
    });

    //emit the error to the server on "error" event
    liveChat.on("error", (error) => {
      socket.emitEvent("error", "Live not found");
      console.log(error);
    });

    //check if the chat can be started else emit error to the server
    if (!(await liveChat.start())) {
      console.log(`error for id : ${this.channelId}`);
      return false;
    }

    liveChats[this.channelId] = liveChat;
    return true;
  }

  //stop the chat listener
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