const Sentry = require("@sentry/node");
const express = require('express')
const { request: Req } = require('express')
const { response: Res } = require('express')

const app = express();
const port = 8000;

Sentry.init({ dsn: "https://30dba8cc80054e25b9b5da7b58d41e00@glitchtip.victorialabs.site/5" });

app.get('/', (req: typeof Req, res: typeof Res) => {
  res.send('Express Bot TS');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});