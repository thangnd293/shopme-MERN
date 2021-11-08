const mongoose = require('mongoose');

const filterSchema = mongoose.Schema({
  _id: String,
  type: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const Filter = mongoose.model('Filter', filterSchema);
module.exports = Filter;
