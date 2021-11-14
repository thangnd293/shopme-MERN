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
    type: String,
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
  if (this.discountPrice === undefined) {
    this.discountPrice = this.price;
  }
  next();
});

variationSchema.post('save', async function () {
  const variants = await this.constructor.find({ product: `${this.product}` });
  let priceMin = this.price;
  let discountPriceMin = this.discountPrice;
  for (const v of variants) {
    if (+v.price < +priceMin) {
      priceMin = v.price;
      discountPriceMin = v.discountPrice;
    }
  }
  const p = await Product.findByIdAndUpdate(variants[0].product._id, {
    price: priceMin,
    discountPrice: discountPriceMin,
  });
});

const ProductVariation = mongoose.model('ProductVariation', variationSchema);

module.exports = ProductVariation;
