const Order = require('./../models/order');
const ProductVariations = require('./../models/productVariations');
const Cart = require('./../models/cart');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const createPaymentJson = async function (next) {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart || cart.items.length === 0) {
    return next(
      new AppError(
        'Your shopping cart is empty. Please select the product before checkout!!',
        400
      )
    );
  }

  const itemArray = [];

  for (const item of cart.items) {
    const vars = await ProductVariations.findById(item.productVariation);
    itemArray.push({
      name: vars.product.name,
      sku: vars._id,
      price: vars.discountPrice,
      currency: 'USD',
      quantity: item.quantity,
    });
  }

  const jsonObj = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:2000/api/v1/checkout/success',
      cancel_url: 'http://localhost:2000/api/v1/checkout/cancel',
    },
    transactions: [
      {
        item_list: {
          items: itemArray,
        },
        amount: {
          currency: 'USD',
          total: cart.total,
        },
      },
    ],
  };

  return jsonObj;
};

const executePaymentJson = function (cart, payerId) {
  const jsonObj = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: cart.total,
        },
      },
    ],
  };

  return jsonObj;
};

exports.pay = catchAsync(async (req, res, next) => {
  const jsonBill = await createPaymentJson(next);
  paypal.payment.create(jsonBill, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

exports.success = catchAsync(async (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const cart = await Cart.findOne({ user: req.user.id });
  const execute_payment_json = await executePaymentJson(cart, payerId);
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        throw error;
      } else {
        cart.items = [];
        await cart.save();
        const order = await Order.create({
          user: req.user.id,
          paymentMethod: payment.payer.payment_method,
          shipping_address: payment.transactions[0].item_list.shipping_address,
          items: payment.transactions[0].item_list.items,
          amount: payment.transactions[0].amount.total,
        });

        res.status(200).json({
          status: 'success',
          data: order,
        });
      }
    }
  );
});

exports.cancel = catchAsync(async (req, res, next) => {
  res.send('Cancelled');
});
