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

  async updateCart(id, updateData) {
    return await this.dao.updateCart(id, updateData);
  }

  async deleteCart(id) {
    return await this.dao.deleteCart(id);
  }
}

module.exports = CartRepository;
