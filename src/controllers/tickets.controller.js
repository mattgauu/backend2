const { ticketService } = require('../services');
const TicketDTO = require('../dtos/TicketDTO');

class TicketController {
  async generateTicket(req, res) {
    try {
      const { purchaser, amount, products } = req.body;
      
      const ticketData = {
        purchaser,
        amount,
        products
      };

      const newTicket = await ticketService.createTicket(ticketData);
      res.status(201).json({ status: 'success', payload: new TicketDTO(newTicket) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getTicket(req, res) {
    try {
      const { tid } = req.params;
      const ticket = await ticketService.getTicketById(tid);
      
      if (!ticket) {
        return res.status(404).json({ status: 'error', error: 'Ticket not found' });
      }

      res.json({ status: 'success', payload: new TicketDTO(ticket) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }
}

module.exports = new TicketController();