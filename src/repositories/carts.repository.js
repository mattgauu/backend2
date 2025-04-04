const { cartDao } = require('../daos/MONGO');
const CartDTO = require('../dtos/CartDTO');

class CartRepository {
  async getCart(id) {
    const cart = await cartDao.getCartById(id);
    return cart ? new CartDTO(cart) : null;
  }
  
  async createCart(cartData) {
    const cart = await cartDao.createCart(cartData);
    return new CartDTO(cart);
  }
  
  // ... otros métodos
}

module.exports = new CartRepository();