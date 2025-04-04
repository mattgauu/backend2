// models/cart.model.js
const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'users' 
  },
  products: [{
    product: { 
      type: Schema.Types.ObjectId, 
      ref: 'products' 
    },
    quantity: Number
  }],
  status: { 
    type: String, 
    default: 'active' 
  }
});

module.exports = model('Cart', cartSchema);