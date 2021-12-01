const Filter = require('./../models/filter');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const filters = await Filter.find().lean();

  const roots = [];
  filters.forEach((f) => {
    if (
      f.type === '/' &&
      f.name !== 'Clothing sizes' &&
      f.name !== 'Colors' &&
      f.name !== 'Shoe Sizes' &&
      f.name !== 'Brands'
    ) {
      roots.push({
        root: f,
        children: [],
      });
    }
  });

  roots.forEach((r) => {
    filters.forEach((f) => {
      if (r.root.name === f.type) {
        r.children.push(f);
      }
    });
  });

  res.status(200).json({
    status: 'Success',
    data: roots,
  });
});

exports.getSizes = catchAsync(async (req, res, next) => {
  const roots = await Filter.find({
    $or: [{ name: 'Clothing sizes' }, { name: 'Shoe sizes' }],
  }).lean();

  const filters = await Filter.find().lean();

  roots.forEach((r) => {
    r.children = [];
    filters.forEach((f) => {
      if (f.type === r.name) {
        r.children.push(f);
      }
    });
  });

  res.status(200).json({
    status: 'Success',
    data: roots,
  });
});

exports.getColors = catchAsync(async (req, res, next) => {
  const filters = await Filter.find({ type: 'Colors' }).lean();

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});

exports.getBrands = catchAsync(async (req, res, next) => {
  const filters = await Filter.find({ type: 'Brands' }).lean();

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});
