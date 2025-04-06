class TicketService {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async generateTicket({ amount, purchaser }) {
    return await this.ticketRepository.createTicket({ amount, purchaser });
  }
}

module.exports = TicketService;
