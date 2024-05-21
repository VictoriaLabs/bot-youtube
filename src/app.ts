import { log } from "console";
import { Chat } from "./chats/chat.ts";
import * as socket from './socket';

let channels: string[] = [];//store the channelIds of the channels to listen to
let chats: Chat[] = [];//store the chat objects of the channels to listen to

//listen to the server for channelId and call Chat class to start the chat listener
socket.onEvent("start-listening", (data: { youtube: string }) => {
  if (data.youtube != null && data.youtube != "") {
    channels.push(data.youtube);
    let chat = new Chat(data.youtube);
    chats.push(chat);
    chat.startChat();
  }
});

socket.onEvent("stop-listening", (data: {youtube: string}) => {
  if (data.youtube != null && data.youtube != "") {
     chats.forEach((chat, index) => {
       if (chat.channelId === data.youtube) {
         chat.stopChat();
         chats.splice(index, 1);
       }
     });
  }
});