const Filter = require('./../models/filter');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getRoot = catchAsync(async (req, res, next) => {
  const filters = await Filter.find({ type: '/' });

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});
exports.getClothingSizes = catchAsync(async (req, res, next) => {
  const filters = await Filter.find({ type: 'Clothing sizes' });

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});
exports.shoeSizes = catchAsync(async (req, res, next) => {
  const filters = await Filter.find({ type: 'Shoe Sizes' });

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});

exports.getAllOfRoot = catchAsync(async (req, res, next) => {
  const parent = await Filter.findById(req.params.id);
  if (!parent) {
    return next(new AppError('Invalid ID!! Filter does not exist'));
  }
  const filters = await Filter.find({ type: parent.name });

  res.status(200).json({
    status: 'Success',
    result: filters.length,
    data: filters,
  });
});
