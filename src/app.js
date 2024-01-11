const socket = require('./socket.js');
const Chat = require ("./Chat.js")

let test = ["UCHoLuRQVGaz5lkdnIZWB8Pw"]

test.forEach(element => {
  let chat = new Chat.Chat(element)
  chat.startChat()
});
