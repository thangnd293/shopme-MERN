const Cart = require('./../models/cart');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Product = require('./../models/product');

exports.prepareCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
    });
  }
  req.cart = cart;
  next();
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).lean();

  cart.items = await Promise.all(
    cart.items.map(
      async (item) => ({
        variant: await Product.aggregate([
          {
            $unwind: '$variants',
          },
          {
            $project: {
              _id: 1,
              name: 1,
              imageCovers: 1,
              images: 1,
              slug: 1,
              variants: 1,
            },
          },
          {
            $match: {
              'variants._id': item.productVariation,
            },
          },
        ]),
        quantity: item.quantity
      })
        
    )
  );

  res.status(200).json({
    status: 'Success',
    data: cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  if (req.body.quantity <= 0 || !req.body.productVariation) {
    return next(new AppError('Fail!!', 400));
  }

  let flag = false;
  for (let i = 0; i < req.cart.items.length; i++) {
    if (`${req.cart.items[i].productVariation}` === req.body.productVariation) {
      req.cart.items[i].quantity += req.body.quantity;
      flag = true;
      break;
    }
  }
  if (!flag) {
    req.cart.items.push({
      productVariation: req.body.productVariation,
      quantity: req.body.quantity,
    });
  }

  await req.cart.save();

  res.status(200).json({
    status: 'Success',
    data: req.cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  req.cart.items = req.body.items;
  req.cart = await req.cart.save();

  res.status(200).json({
    status: 'Success',
    data: req.cart,
  });
});

exports.removeItemCart = catchAsync(async (req, res, next) => {
  let index;
  for (const [i, item] of req.cart.items.entries()) {
    if (`${item.productVariation}` === req.params.itemId) {
      index = i;
      break;
    }
  }
  if (index != undefined) {
    req.cart.items.splice(index, 1);
  }

  await req.cart.save();

  res.status(200).json({
    status: 'Success',
    data: req.cart,
  });
});

exports.resetCart = catchAsync(async (req, res, next) => {
  req.cart.items = [];
  await req.cart.save();

  res.status(200).json({
    status: 'Success',
    data: req.cart,
  });
});
