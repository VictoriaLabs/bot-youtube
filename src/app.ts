const socket = require('./socket.js');
const { google } = require('googleapis');
const { LiveChat } = require("youtube-chat")
const port = 8000;

/** YOUTUBE **/
async function chat() {
  try {
    const liveChat = new LiveChat({ channelId: "UCHoLuRQVGaz5lkdnIZWB8Pw" });

    let going = false;

    liveChat.on("start", async () => {
      console.log("start");

      if (!going && await liveChat.isActive()) {
        // Actually start the live chat connection here
        await liveChat.start();
        going = true;
      } else {
        // Do something else if the live stream is not active
        console.log("Live stream is not active");
      }
    });

    liveChat.on("end", () => {
      liveChat.stop();
      going = false;
    });

    liveChat.on("chat", (chatItem: any) => {
      socket.emitEvent("message", chatItem);
    });

    liveChat.on("error", (error: any) => {
      console.error(error);
    });

    const ok = await liveChat.start();
    if (!ok) {
      setTimeout(() => {
        chat();
      }, 8000);
    }
  } catch {
    setTimeout(() => {
      chat();
    }, 8000);
  }
}
chat();


chat();