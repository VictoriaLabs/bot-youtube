"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { request: Req } = require('express');
const { response: Res } = require('express');
const { google } = require('googleapis');
const { LiveChat } = require("youtube-chat");
const app = express();
const port = 8000;
let allMessages = [];
/** EXPRESS **/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/messages', (req, res) => {
    res.json(allMessages);
});

/** YOUTUBE **/
function chat() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const liveChat
            const liveChat = new LiveChat({ channelId: "UCHoLuRQVGaz5lkdnIZWB8Pw" });
            let going = false;
            liveChat.on("start", () => {
                console.log('start');
                setTimeout(() => {
                    going = true;
                }, 8000);
            });
            liveChat.on("end", () => {
                going = false;
                setTimeout(() => {
                    chat();
                }, 8000);
            });
            liveChat.on("chat", (chatItem) => {
                console.log(chatItem);
                allMessages.push(JSON.stringify({
                    platform: 'YouTube',
                    author: chatItem.author.name,
                    message: chatItem.message[0].text
                }));
                console.log('-------------------------------------------------------');
            });
            liveChat.on("error", (error) => {
                console.log(error);
            });
            const ok = yield liveChat.start();
            if (!ok) {
                setTimeout(() => {
                    chat();
                }, 8000);
            }
        }
        catch (_a) {
            setTimeout(() => {
                chat();
            }, 8000);
        }
    });
}
chat();
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
