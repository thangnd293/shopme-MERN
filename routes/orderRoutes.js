const express = require('express');
const checkOutController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/').post(checkOutController.createOrder);
module.exports = router;
