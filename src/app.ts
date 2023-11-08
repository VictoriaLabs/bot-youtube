const express = require('express')
const { request: Req } = require('express')
const { response: Res } = require('express')
const puppeteer = require('puppeteer'); //puppeteer is a node library that emulates a headless browser

const app = express();
const port = 8000;

async function runBot(channelName: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Access the YouTube channel using the provided channel name
  await page.goto(`https://www.youtube.com/c/${channelName}`);

  // Detect if the channel is live
  const isLive = await page.evaluate(() => {
    const liveIndicator = document.querySelector('yt-live-chat-text-message-renderer');
    return liveIndicator && liveIndicator.textContent === 'EN DIRECT';
  });

  if (isLive) {
    // If the channel is live, click on the chat input field
    await page.click('yt-live-chat-text-input-field-renderer');
    await page.waitForSelector('yt-live-chat-text-input-field-renderer input');
    const chatInput = await page.$('yt-live-chat-text-input-field-renderer input');

    // Listen for new chat messages
    page.on('console', (message: any) => {
      if (message.type() === 'log' && message.text().includes('yt-live-chat-text-message-renderer')) {
        console.log(message.text());
        // Send the messages to your server
      }
    });

    await chatInput.type('Bonjour, je suis un bot !'); // This is the message you want to send to ensure the bot is working
    await chatInput.press('Enter'); // Send the message

    // Keep the browser open to receive chat messages
  }

  // When finished, close the browser
  await browser.close();
}

const channelName = 'vardose'; // Replace with the desired channel name
runBot(channelName);

app.get('/', (req: typeof Req, res: typeof Res) => {
  res.send('Express Bot TS');
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});