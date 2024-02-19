const { EmailController } = require("../../controllers");

const express = require("express");
const router = express.Router();

router.post("/tickets", EmailController.createTicket);

module.exports = router;
