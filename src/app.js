
  const socket = require('./socket.js');
  const { google } = require('googleapis');
  const { LiveChat } = require("youtube-chat")


  /** YOUTUBE **/
  async function chat() {
    
      const liveChat = new LiveChat({ channelId: "UCHoLuRQVGaz5lkdnIZWB8Pw" });

      let going = false;

      liveChat.on("start", async () => {
        console.log("start");

        liveChat.start();
        
        going = true
      })

      liveChat.on('end', () => {
        socket.disconnect();
      })

      liveChat.on("chat", (chatItem) => {
        socket.send("message", chatItem);
      });

      liveChat.on("error", (error) => {
        console.error(error);
      });

      const ok = await liveChat.start();
      if (!ok) {
        setTimeout(() => {
          chat()
        }, 8000)
      }
    }


  chat()