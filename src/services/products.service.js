const { productRepository } = require('../repositories');

class ProductsService {
  async getProducts() {
    return await productRepository.getProducts();
  }

  async getProductById(id) {
    return await productRepository.getProductById(id);
  }

  async createProduct(productData) {
    return await productRepository.createProduct(productData);
  }

  async updateProduct(id, productData) {
    return await productRepository.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await productRepository.deleteProduct(id);
  }

  async updateStock(productId, quantity) {
    const product = await productRepository.getProductById(productId);
    if (!product) throw new Error('Product not found');
    
    const newStock = product.stock - quantity;
    if (newStock < 0) throw new Error('Insufficient stock');
    
    return await productRepository.updateProduct(productId, { stock: newStock });
  }
}

module.exports = new ProductsService();