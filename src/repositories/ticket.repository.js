class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    createTicket(data) {
      return this.dao.createTicket(data);
    }
  
    getTicketById(id) {
      return this.dao.getTicketById(id);
    }
  }
  
  module.exports = TicketRepository;
  