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
  const cart = await Cart.findOne({ user: req.user._id });
  let items = [...cart.items];
  
  items = await Promise.all(
    cart.items.map(
      async (item) => {
        const data = await Product.findOne({'variants._id' : item.productVariation});
        return {
          productVariation: !data ? null : item.productVariation,
          quantity: item.quantity
        }
      }
    )
  );

  const validItems = [];
  items.forEach(item => {
    if(item.productVariation) {
      validItems.push(item);
    }
  })

  cart.items = validItems;
  await cart.save();

  const result = await getInfoItem(cart._doc);

  res.status(200).json({
    status: 'Success',
    data: result,
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

  const result = await getInfoItem(req.cart._doc);

  res.status(200).json({
    status: 'Success',
    data: result,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const productVariation = req.body.productVariation;
  const quantity = req.body.quantity;
  for (let i = 0; i < req.cart.items.length; i++) {
    if(`${req.cart.items[i].productVariation}` === productVariation) {
      req.cart.items[i].quantity = quantity;
      break;
    }
  }
  await req.cart.save();

  const result = await getInfoItem(req.cart._doc);

  res.status(200).json({
    status: 'Success',
    data: result,
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

  const result = await getInfoItem(req.cart._doc);

  res.status(200).json({
    status: 'Success',
    data: result,
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

const getInfoItem = async function(cart) {
  const result = cart;
  result.items = await Promise.all(
    cart.items.map(
      async (item) => {
        const data = await Product.aggregate([
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
              brand: 1,
            },
          },
          {
            $match: {
              'variants._id': item.productVariation,
            },
          }
        ])
        return {
          data: data[0],
          quantity: item.quantity
        }
      }
    )
  );
  
  return result;
}
