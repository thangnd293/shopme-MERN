const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    require: true,
  },
  paymentMethod: String,
  shipping_address: {
    recipient_name: String,
    line1: String,
    city: String,
    state: String,
    postal_code: String,
    country_code: String,
  },
  items: [
    {
      name: {
        type: String,
        require: true,
      },
      sku: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
  amount: Number,
  create_time: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
