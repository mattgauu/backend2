// src/repositories/carts.repository.js
class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart(cartData) {
    return await this.dao.createCart(cartData);
  }

  async getCart(id) {
    return await this.dao.getCartById(id);
  }

  // otros métodos...
}

// Exporta la clase directamente
module.exports = CartRepository;