const services = require('../services');
const CartService = services.cartService;
const ProductService = services.productService;
const TicketService = services.ticketService;

const CartDTO = require('../dtos/CartDTO');
const TicketDTO = require('../dtos/TicketDTO');

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await CartService.createCart();
      res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCart(cid);
      if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
      res.json({ status: 'success', payload: new CartDTO(cart) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const updateData = req.body;
      const updatedCart = await CartService.updateCart(cid, updateData);
      res.json({ status: 'success', payload: new CartDTO(updatedCart) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const cart = await CartService.getCart(cid);
      if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

      const existingProduct = cart.products.find(item => item.product.toString() === pid);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      const updatedCart = await CartService.updateCart(cid, { products: cart.products });
      res.json({ status: 'success', payload: new CartDTO(updatedCart) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartService.getCart(cid);
      if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

      cart.products = cart.products.filter(item => item.product.toString() !== pid);
      const updatedCart = await CartService.updateCart(cid, { products: cart.products });
      res.json({ status: 'success', payload: new CartDTO(updatedCart) });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }

  async purchase(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCart(cid);
      if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

      const productsNotProcessed = [];
      let totalAmount = 0;
      const purchasedProducts = [];

      for (const item of cart.products) {
        const product = await ProductService.getProduct(item.product);

        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await ProductService.updateProduct(product._id, { stock: product.stock });

          totalAmount += product.price * item.quantity;
          purchasedProducts.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
          });
        } else {
          productsNotProcessed.push(item.product);
        }
      }

      const ticket = await TicketService.createTicket({
        amount: totalAmount,
        purchaser: req.user.email,
        products: purchasedProducts
      });

      await CartService.updateCart(cid, {
        products: cart.products.filter(item =>
          productsNotProcessed.includes(item.product.toString())
        )
      });

      res.json({
        status: 'success',
        payload: {
          ticket: new TicketDTO(ticket),
          productsNotProcessed
        }
      });
    } catch (error) {
      res.status(500).json({ status: 'error', error: error.message });
    }
  }
}

module.exports = new CartController();

