import { Request, Response } from 'express';
const express = require('express')
const { request: Req } = require('express')
const { response: Res } = require('express')
const { google } = require('googleapis');
const { LiveChat } = require("youtube-chat")
const app = express();
const port = 8000;

let allMessages: string[] = [];

/** EXPRESS **/
app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/messages', (req: typeof Req, res: typeof Res) => {
  res.json(allMessages);
});

/** YOUTUBE **/
async function chat() {
  try {

    //const liveChat
    const liveChat = new LiveChat({ liveId: "fG1qW6z7hwU" })

    let going = false
    liveChat.on("start", () => {
      console.log('start')
      setTimeout(() => {
        going = true
      }, 8000)
    })

    liveChat.on("end", () => {
      going = false
      setTimeout(() => {
        chat();
      }, 8000)
    })

    interface ChatItem {
      author: {
        name: string;
      };
      message: {
        text: string;
      }[];
    }

    liveChat.on("chat", (chatItem: ChatItem) => {
      console.log(chatItem);
      allMessages.push(JSON.stringify({
        platform: 'YouTube',
        author: chatItem.author.name,
        message: chatItem.message[0].text
      }));
      console.log('-------------------------------------------------------')
    })

    liveChat.on("error", (error: any) => {
      console.log(error);
    });

    const ok = await liveChat.start()
    if (!ok) {
      setTimeout(() => {
        chat();
      }, 8000)
    }

  } catch {
    setTimeout(() => {
      chat();
    }, 8000)
  }
}

chat();


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});