const nodemailer = require("nodemailer");
const {
  GMAIL_EMAIL,
  GMAIL_PASS,
  HOST,
  GMAIL_PORT,
} = require("./server-config");

const mailSender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASS,
  },
});

module.exports = mailSender;
