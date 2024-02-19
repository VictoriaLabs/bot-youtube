import { Chat } from "./Chat";
import * as socket from './socket';
import Sentry from "@sentry/node";

Sentry.init({ dsn: "https://30dba8cc80054e25b9b5da7b58d41e00@glitchtip.victorialabs.site/5" });

//listen to the server for channelId and call Chat class to start the chat listener
socket.onEvent("channelId", (data: string) => {
  let chat: Chat = new Chat(data);
  chat.startChat();
});