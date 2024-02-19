const express = require("express");
const app = express();
const { logConfig } = require("./config");
const mailSender = require("./config/email-config");
const { ServerConfig } = require("../src/config");
const routes = require("../src/routes");
const { GMAIL_EMAIL } = require("./config/server-config");

app.use("/api", routes);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });

 
});
