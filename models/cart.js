const mongoose = require('mongoose');
const Product = require('./product');
const AppError = require('./../utils/appError');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    require: [true, 'The shopping cart must belong to user!!'],
  },
  items: [
    {
      productVariation: {
        type: mongoose.Schema.ObjectId,
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  quantity: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

cartSchema.index({ user: 1 });

cartSchema.pre('save', async function (next) {
  let qty = 0;
  let total = 0;

  for (const item of this.items) {
    const vars = await Product.aggregate([
      {
        $unwind: '$variants',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          imageCovers: 1,
          images: 1,
          slug: 1,
          variants: 1,
        },
      },
      {
        $match: {
          'variants._id': mongoose.mongo.ObjectId(item.productVariation),
        },
      },
    ]);
    if (!vars) {
      return next(new AppError('ID invalid!!', 400));
    }

    total += vars[0]?.variants.discountPrice * item.quantity;
    qty += item.quantity;
  }

  this.quantity = qty;
  this.total = total;
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
