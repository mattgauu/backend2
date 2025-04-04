class ProductDTO {
    constructor(product) {
      this.id = product._id;
      this.title = product.title;
      this.code = product.code;
      this.category = product.category;
      this.price = product.price;
      this.stock = product.stock;
      this.status = product.status !== undefined ? product.status : true;
    }
  }
  
  module.exports = ProductDTO;