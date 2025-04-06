const { ticketModel } = require('./models/ticket.model');
const crypto = require('crypto');

class TicketsDaoMongo {
  async createTicket({ amount, purchaser }) {
    const code = crypto.randomUUID();
    const ticket = await ticketModel.create({
      code,
      amount,
      purchaser
    });
    return ticket;
  }

  async getTicketById(id) {
    return await ticketModel.findById(id);
  }
}

module.exports = TicketsDaoMongo;
