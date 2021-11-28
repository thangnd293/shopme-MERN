const Bill = require('./../models/bill');
const catchAsync = require('./../utils/catchAsync');
const Cart = require('./../models/cart');

exports.createBill = catchAsync(async (req, resp, next) => {

    const { shipping_address, data, total } = req.body;
    const items = data?.map(item => ({
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        price: item.unit_amount.value,
        total: item.quantity * item.unit_amount.value 
    }));
    
    const billObj = {
        user: req.user.id,
        shipping_address,
        items,
        amount: total
    }

    await Bill.create(billObj);
    const cart = Cart.findOne({user: req.user.id});
    cart.items = [];
    await cart.save();

    res.status(200).json({
        status: 'Success'
    });
})