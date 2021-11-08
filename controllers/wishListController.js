const WishList = require('./../models/wishList');
const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/product');
const AppError = require('../utils/appError');

exports.prepareWishList = catchAsync(async (req, res, next) => {
  let wishList = await WishList.findOne({ user: req.user.id });
  if (!wishList) {
    wishList = await WishList.create({
      user: req.user.id,
    });
  }
  req.wishList = wishList;
  next();
});

exports.getWishList = catchAsync(async (req, res, next) => {
  const wishList = await WishList.findOne({ user: req.user.id }).populate(
    'products.product'
  );

  res.status(200).json({
    status: 'success',
    data: wishList,
  });
});

exports.addToWishList = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.body.product);

  if (!product) {
    return next(new AppError('Invalid product!!'), 400);
  }
  if (req.wishList.products.find((p) => `${p.product}` === req.body.product)) {
    return next(new AppError('The product is already in the wishlist!!', 400));
  }

  req.wishList.products.push({
    product: req.body.product,
  });

  await req.wishList.save();

  res.status(200).json({
    status: 'success',
    data: req.wishList,
  });
});

exports.removeFromWishList = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.body.product);

  if (!product) {
    return next(new AppError('Invalid product!!'), 400);
  }
  let index;
  for (const [i, p] of req.wishList.products.entries()) {
    if (`${p.product}` === req.body.product) {
      index = i;
      break;
    }
  }
  if (index === undefined) {
    return next(new AppError('The product is not in the wishlist!!'), 400);
  }

  req.wishList.products.splice(index, 1);

  await req.wishList.save();

  res.status(200).json({
    status: 'success',
    data: req.wishList,
  });
});
