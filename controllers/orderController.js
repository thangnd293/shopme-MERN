const Order = require('./../models/order');
const catchAsync = require('./../utils/catchAsync');

exports.createOrder = catchAsync(async (req, resp, next) => {
    const data = req.body;
    console.log(data);

    resp.send(200);
})