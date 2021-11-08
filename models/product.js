const mongoose = require('mongoose');
const slugify = require('slugify');
const AppError = require('../utils/appError');
const Filter = require('./filter');
// const appError = require('./../utils/appError');
// const Category = require('./category');

const productSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      require: [true, 'Vui lòng nhập tên sản phẩm!!'],
    },
    category: {
      type: String,
      ref: 'Category',
      require: true,
    },
    categoryName: String,
    brand: String,
    price: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: [String],
      default: [''],
    },
    images: [String],
    details: {
      type: [String],
      require: true,
    },
    composition: [String],
    color: String,
    categoryPath: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: String,
    tags: [String],
    filters: [String],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.index({ 'options.price': 1 });
productSchema.index({ filters: 1 });
productSchema.index({ categoryPath: 1 });

// Xu ly truoc khi duoc luu vao DB
productSchema.pre('save', async function (next) {
  // Render ID for Product
  if (!this._id) {
    let id = Math.ceil(Math.random() * 100000);
    while (await Product.findById(id)) {
      id = Math.ceil(Math.random() * 100000);
    }
    this._id = id;
  }

  this.slug = slugify(this.name, { lower: true });

  const filters = this.filters.map(async (id) => {
    const filter = await Filter.findById(id);
    return `${filter.type}-${filter.name}-${filter._id}`;
  });
  this.filters = await Promise.all(filters);
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
