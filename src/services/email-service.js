const { StatusCodes } = require("http-status-codes");
const { Mailer } = require("../config");
const { TicketRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const ticketRepository = new TicketRepository();

async function sendEmail(mailfrom, mailto, content, subject) {
  try {
    const response = await Mailer.sendMail({
      from: mailfrom,
      to: mailto,
      subject: subject,
      content: content,
    });
    return response;
  } catch (error) {
    throw new AppError("Cannot send mail", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function createTicket(data) {
  try {
    const ticket = await ticketRepository.create(data);
    return ticket;
  } catch (error) {
    throw new AppError(
      "Cannot create Ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function pendingEmails() {
  try {
    const pendingEmails = await ticketRepository.pendingTickets();
    return pendingEmails;
  } catch (error) {
    throw new AppError(
      "Cannot found pending emails",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  sendEmail,
  createTicket,
  pendingEmails,
};
