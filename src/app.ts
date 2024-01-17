// const Chat = require ("./Chat.js")

// let arr = fetch(core)
// arr.forEach(element => {
//   let chat = new Chat.Chat(element)
//   chat.startChat()
// });

import { Chat } from "./Chat";

let arr: string[] = ["UCHoLuRQVGaz5lkdnIZWB8Pw"]
// let arr: string[] = fetch(core);
arr.forEach((element: any) => {
  let chat: Chat = new Chat(element);
  chat.startChat();
});