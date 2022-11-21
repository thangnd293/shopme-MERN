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
  const wishList = await WishList.findOne({ user: req.user.id }).populate({
    path: 'products.product',
    select:
      '-filters -facets -longDescription -shortDescription -isFeatured -categoryPath -__v -createAt -images',
  });

  res.status(200).json({
    status: 'Success',
    data: wishList,
  });
});

exports.addToWishList = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.body.product);

  if (!product) {
    return next(new AppError('Invalid product!!'), 400);
  }
  let index = -1;
  if (
    req.wishList.products.find((p) => {
      index++;
      return `${p.product}` === req.body.product;
    })
  ) {
    req.wishList.products.splice(index, 1);
    await req.wishList.save();
  } else {
    req.wishList.products.push({
      product: req.body.product,
    });
    await req.wishList.save();
  }

  const wishList = await WishList.findOne({ user: req.user.id }).populate({
    path: 'products.product',
    select:
      '-filters -facets -longDescription -shortDescription -isFeatured -categoryPath -__v -createAt -images',
  });

  res.status(200).json({
    status: 'Success',
    data: wishList,
  });
});
