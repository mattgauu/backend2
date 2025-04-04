// models/ticket.model.js
const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  code: { 
    type: String, 
    unique: true, 
    default: () => Math.random().toString(36).substring(2, 10) 
  },
  purchase_datetime: { 
    type: Date, 
    default: Date.now 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  purchaser: { 
    type: String, 
    required: true 
  },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: Number,
    price: Number
  }]
});

module.exports = model('Ticket', ticketSchema);