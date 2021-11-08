const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    require: [true, 'Tên loại sản phẩm là bắt buộc!'],
  },
  parent: {
    type: String,
    default: '/',
  },
  path: {
    type: String,
  },
  level: {
    type: Number,
    require: true,
  },
  createAt: Date,
  slug: String,
});

categorySchema.index({ path: 1 });
categorySchema.index({ parent: 1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
