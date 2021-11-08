const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Phải đăng nhập trước
router.use(authController.protect);
router.use(cartController.prepareCart);
router.route('/').get(cartController.getCart).patch(cartController.updateCart);
router.route('/:itemId').delete(cartController.removeItemCart);
router.route('/add-to-cart').post(cartController.addToCart);
router.route('/reset').post(cartController.resetCart);

module.exports = router;
