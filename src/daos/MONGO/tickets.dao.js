class TicketsDaoMongo {
  async createTicket(ticketData) {
    return await ticketModel.create(ticketData);
  }

  async getTicketById(id) {
    return await ticketModel.findById(id).populate('products.product');
  }

  async getTicketsByPurchaser(email) {
    return await ticketModel.find({ purchaser: email }).populate('products.product');
  }
}

module.exports = TicketsDaoMongo; // ✅
