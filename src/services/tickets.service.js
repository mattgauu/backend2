// services/ticket.service.js
const { ticketDao } = require('../daos');

class TicketService {
  async createTicket(ticketData) {
    return await ticketDao.create(ticketData);
  }
  
  async getTicketById(id) {
    return await ticketDao.getBy({ _id: id });
  }
}

module.exports = new TicketService();