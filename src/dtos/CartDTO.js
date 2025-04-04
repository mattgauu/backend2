class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));
    this.status = cart.status;
  }
}

module.exports = CartDTO;