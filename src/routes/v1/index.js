const express = require("express");
const { infoController } = require("../../controllers");
const emailRoutes = require("./email-routes");
const router = express.Router();

router.get("/", infoController.info);
router.use("/notifications", emailRoutes);

module.exports = router;
