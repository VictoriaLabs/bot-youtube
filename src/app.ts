import { Socket } from "socket.io-client";
import { Chat } from "./Chat";
import * as socket from './socket';




socket.onEvent("channelId", (data: string) => {
  let chat: Chat = new Chat(data);
  chat.startChat();
});