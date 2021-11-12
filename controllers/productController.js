const multer = require('multer');
const sharp = require('sharp');

const Product = require(`${__dirname}/../models/product`);
const Category = require('./../models/category');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const ProductVariation = require('./../models/productVariations');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.fields([
  { name: 'imageCover', maxCount: 2 },
  { name: 'images', maxCount: 10 },
]);

exports.setCategoryPath = catchAsync(async function (req, res, next) {
  if (!req.body.category) {
    return next();
  }

  const category = await Category.findById(`${req.body.category}`);

  if (!category) {
    return next(new AppError('Không tìm thấy loại sản phẩm tương ứng!!', 404));
  }

  req.body.categoryName = category.name;
  req.body.categoryPath = category.path;
  next();
});

exports.updateProduct = catchAsync(async function (req, res, next) {
  const { options, ...objBody } = req.body;

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('ID không tồn tại!!', 404));
  }
  product.set(objBody);

  await product.save();
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return next(new AppError('ID không hợp lệ', 400));
    }
    filter = { categoryPath: new RegExp(`${category.path}`) };
  }

  const features = new APIFeatures(Product.find(filter), req.query)
    .filterFacets()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc,
  });
});

exports.getFacets = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(new AppError('ID không hợp lệ', 400));
  }

  const p = { categoryPath: new RegExp(`${category.path}`) };
  const filters = await Product.aggregate([
    { $match: p },
    { $unwind: '$filters' },
    {
      $group: {
        _id: '$filters',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: filters,
  });
});

exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('ID không tồn tại!!', 404));
  }
  await ProductVariation.deleteMany({ product: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getProductFeatured = catchAsync(async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  const product = await Product.find({ isFeatured: true }).limit(+count);

  res.status(200).json({
    status: 'success',
    results: product.length,
    data: product,
  });
});
