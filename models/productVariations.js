const mongoose = require('mongoose');
const Product = require('./product');

const variationSchema = mongoose.Schema({
  product: {
    type: String,
    ref: 'Product',
    require: true,
  },
  price: {
    type: Number,
    require: [true, 'Vui lòng nhập giá cho sản phẩm'],
  },
  discountPrice: {
    type: Number,
    default: function () {
      return this.price;
    },
  },
  size: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    min: 0,
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
  await Product.findByIdAndUpdate(this.product, {
    price: this.price,
    discountPrice: this.discountPrice,
  });

  next();
});

const ProductVariation = mongoose.model('ProductVariation', variationSchema);

module.exports = ProductVariation;
