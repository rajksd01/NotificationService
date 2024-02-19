const express = require("express");
const app = express();
const { logConfig } = require("./config");
const { ServerConfig } = require("../src/config");
const apiRoutes = require("../src/routes");
const amqplib = require("amqplib");
const { EmailService } = require("./services/");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

//Queue Problem

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");

    const channel = await connection.createChannel();

    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue", (data) => {
      const dataObj = JSON.parse(`${Buffer.from(data.content)}`);
      EmailService.sendEmail(
        ServerConfig.GMAIL_EMAIL,
        dataObj.recepientEmail,
        dataObj.subject,
        dataObj.text
      );
      console.log(`${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {}
}

app.listen(ServerConfig.PORT, async () => {
  console.log("listening on port " + ServerConfig.PORT);
  await connectQueue();
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
