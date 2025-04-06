const cartsDao = require('../daos/factory');
const CartRepository = require('../repositories/carts.repository');

const cartsDao = new CartsDaoMongo();
const cartRepository = new CartRepository(CartsDao);

class CartService {
  async createCart(cartData) {
    return await cartRepository.createCart(cartData);
  }

  async getCart(id) {
    return await cartRepository.getCart(id);
  }

  async updateCart(id, updateData) {
    return await cartRepository.updateCart(id, updateData);
  }

  async deleteCart(id) {
    return await cartRepository.deleteCart(id);
  }
}

module.exports = new CartService();
