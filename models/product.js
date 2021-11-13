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
    price: Number,
    discountPrice: Number,
    imageCovers: [String],
    images: [String],
    longDescription: String,
    shortDescription: String,
    categoryPath: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: String,
    filters: [
      {
        type: String,
        ref: 'Filter',
      },
    ],
    facets: [
      {
        _id: String,
        type: {
          type: String,
        },
        name: String,
      },
    ],
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

  this.facets = [];
  await Promise.all(
    this.filters.map(async (id) => {
      const filter = await Filter.findById(id);
      if (!filter) {
        return next(
          new AppError('Filter does not exist. Please try again later.')
        );
      }
      this.facets.push({
        _id: filter._id,
        type: filter.type,
        name: filter.name,
      });
    })
  );

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
