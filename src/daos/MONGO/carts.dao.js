const { cartModel } = require('../MONGO/models/cart.model.js');

class CartDao {
  async createCart(cartData) {
    return await cartModel.create(cartData);
  }
  
  async getCartById(id) {
    return await cartModel.findById(id).populate('products.product');
  }
  
  async updateCart(id, updateData) {
    return await cartModel.findByIdAndUpdate(id, updateData, { new: true });
  }
  
  async deleteCart(id) {
    return await cartModel.findByIdAndDelete(id);
  }
}

module.exports = new CartDao();