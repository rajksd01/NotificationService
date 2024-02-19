const express = require("express");
const app = express();
const { logConfig } = require("./config");
const { ServerConfig } = require("../src/config");
const apiRoutes = require("../src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
