import { Chat } from "./chats/chat.ts";
import * as socket from './socket';

//listen to the server for channelId and call Chat class to start the chat listener
socket.onEvent("channelId", (data: string) => {
  let chat: Chat = new Chat(data);
  chat.startChat();
});