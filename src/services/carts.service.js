const { cartDao, productDao } = require('../daos/MONGO');
const CartDTO = require('../dtos/CartDTO');

class CartsService {
  async createCart(userId) {
    const newCart = await cartDao.createCart({ user: userId, products: [] });
    return new CartDTO(newCart);
  }

  async getCart(id) {
    const cart = await cartDao.getCartById(id);
    return cart ? new CartDTO(cart) : null;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const product = await productDao.getBy({ _id: productId });
    if (!product) throw new Error('Product not found');
    
    return await cartDao.updateCart(cartId, {
      $push: { products: { product: productId, quantity } }
    });
  }

  async purchaseCart(cartId, userEmail) {
    const cart = await cartDao.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    
    // Implementar lógica de compra según consignas
    // ...
  }
}

module.exports = new CartsService();