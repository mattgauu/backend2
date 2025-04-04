// controllers/carts.controller.js
const { cartService, productService, ticketService } = require('../services');
const CartDTO = require('../dtos/CartDTO');

class CartController {
  async purchase(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCart(cid);
      
      const productsNotProcessed = [];
      let totalAmount = 0;
      const purchasedProducts = [];

      for (const item of cart.products) {
        const product = await productService.getProduct(item.product);
        
        if (product.stock >= item.quantity) {
          // Actualizar stock
          product.stock -= item.quantity;
          await productService.updateProduct(product._id, { stock: product.stock });
          
          // Calcular monto
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

      // Crear ticket
      const ticket = await ticketService.createTicket({
        amount: totalAmount,
        purchaser: req.user.email,
        products: purchasedProducts
      });

      // Actualizar carrito con productos no procesados
      await cartService.updateCart(cid, {
        products: cart.products.filter(item => 
          productsNotProcessed.includes(item.product.toString())
      )});

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