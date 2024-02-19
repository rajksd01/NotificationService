const express = require("express");
const app = express();
const { logConfig } = require("./config");
const mailSender = require("./config/email-config");
const { ServerConfig } = require("../src/config");
const routes = require("../src/routes");
const { GMAIL_EMAIL } = require("./config/server-config");

app.use("/api", routes);

app.listen(ServerConfig.PORT, async () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });

  const response = await mailSender.sendMail({
    from: GMAIL_EMAIL,
    to: "niteshnepal101@gmail.com",
    subject: "Test 123",
    text: "Testing testing",
  });
  console.log(response);
});
