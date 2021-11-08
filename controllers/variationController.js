const Product = require(`${__dirname}/../models/product`);
const Category = require('./../models/category');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Variation = require('./../models/productVariations');

exports.createVariation = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Biến thể phải thuộc về 1 sản phẩm!!', 400));
  }

  req.body.product = req.params.id;

  const vari = await Variation.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: vari,
    },
  });
});

exports.updateVariation = factory.updateOne(Variation);
exports.deleteVariation = factory.deleteOne(Variation);
exports.getVariation = factory.getOne(Variation);

exports.getAllVariation = catchAsync(async (req, res, next) => {
  let filter = {};
  let flag = false;
  if (req.params.id) {
    filter = { product: req.params.id };
    flag = true;
  }
  let vars = Variation.find(filter);
  vars.flag = flag;
  vars = await vars;

  res.status(201).json({
    status: 'success',
    result: vars.length,
    data: vars,
  });
});
