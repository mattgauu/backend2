const { cartModel } = require('../MONGO/models/cart.model');


class CartsDaoMongo {
  async createCart(cartData = {}) {
    return await cartModel.create(cartData);
  }

  async getCartById(id) {
    const cart = await cartModel.findById(id).populate('products.product');
    if (!cart) return null;
  
    
    cart.products = cart.products.filter(p => p.product !== null);
    return cart;
  }
  

  async updateCart(id, updateData) {
    return await cartModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteCart(id) {
    return await cartModel.findByIdAndDelete(id);
  }
}

module.exports = CartsDaoMongo;
