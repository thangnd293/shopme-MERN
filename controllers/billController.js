const Bill = require("./../models/bill");
const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/cart");
const AppError = require("../utils/appError");
const fs = require("fs");
const sendEmail = require("./../utils/email");

exports.createBill = catchAsync(async (req, resp, next) => {
  const { shipping_address, data, quantityTotal, total } = req.body;
  const items = data?.map((item) => ({
    sku: item.sku,
    name: item.name,
    quantity: item.quantity,
    price: item.unit_amount.value,
    total: item.quantity * item.unit_amount.value,
  }));

  const billObj = {
    user: req.user.id,
    shipping_address,
    items,
    amount: total,
    quantity: quantityTotal,
  };

  const newBill = await Bill.create(billObj);
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return next(new AppError("Bad request", 400));
  }

  cart.items = [];
  await cart.save();

  let html = fs.readFileSync(`${__dirname}/../emailtemplate/transaction.html`, {
    encoding: "utf-8",
  });
  html = html.replace("<%NAME>", req.user.fname);
  html = html.replace("<%AMOUNT>", newBill.amount);

  try {
    await sendEmail({
      email: req.user.email,
      subject,
      html,
    });

    res.status(200).json({
      status: "Success",
      message: "Email send",
      email: req.user.email,
    });
  } catch (err) {
    next(new AppError("Sending email failed!!"), 500);
  }
});

exports.getAllBill = catchAsync(async (req, resp, next) => {
  const bills = await Bill.find().sort({ createAt: 1 }).lean();

  resp.status(200).json({
    status: "success",
    result: bills.length,
    data: bills,
  });
});

exports.getMyBill = catchAsync(async (req, resp, next) => {
  const { id } = req.user;
  const bills = await Bill.find({ user: id }).sort({ createAt: 1 }).lean();

  resp.status(200).json({
    status: "success",
    result: bills.length,
    data: bills,
  });
});
