const CrudRepository = require("./crud-repository");
const { Tickets } = require("../models");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Tickets);
  }

  async pendingTickets() {
    const pendingTickets = await Tickets.findAll({
      where: {
        status: "PENDING",
      },
    });
    return pendingTickets;
  }
}

module.exports = TicketRepository;
