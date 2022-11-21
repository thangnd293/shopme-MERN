const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'The shopping cart must belong to user!!'],
  },
  products: [
    {
      product: {
        type: String,
        ref: 'Product',
      },
    },
  ],
});

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
