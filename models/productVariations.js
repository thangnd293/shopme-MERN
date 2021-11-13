const mongoose = require('mongoose');
const Product = require('./product');
const AppError = require('./../utils/appError');

const variationSchema = mongoose.Schema({
  product: {
    type: String,
    ref: 'Product',
    require: true,
  },
  price: {
    type: Number,
    default: 1,
    min: [1, 'Price must be more than 1$'],
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function (value) {
        return this.price >= value && value >= 0;
      },
      message:
        'Discount price must be less than the original price and greater than 0$!!',
    },
  },
  size: {
    type: String,
    require: true,
  },
});

variationSchema.index({ product: 1, size: 1 }, { unique: true });
variationSchema.index({ product: 1 });

variationSchema.pre(/^find/, function (next) {
  if (!this.flag) {
    this.populate({ path: 'product' });
  }

  next();
});

variationSchema.pre('save', async function (next) {
  if (this.size === undefined) {
    return next(new AppError('Please choose size!!', 400));
  }

  if (this.discountPrice === undefined) {
    this.discountPrice = this.price;
  }
  await Product.findByIdAndUpdate(this.product, {
    price: this.price,
    discountPrice: this.discountPrice,
  });

  next();
});

const ProductVariation = mongoose.model('ProductVariation', variationSchema);

module.exports = ProductVariation;
