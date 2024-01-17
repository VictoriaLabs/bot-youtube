import { Chat } from "./Chat";

let arr: string[] = ["UCHoLuRQVGaz5lkdnIZWB8Pw","UCrG8mytOLrC_t5vu7To4ajA"]
// let arr: string[] = fetch(core);
arr.forEach((element: any) => {
  let chat: Chat = new Chat(element);
  chat.startChat();
});