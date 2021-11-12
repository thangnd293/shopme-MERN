const express = require('express');
const checkOutController = require('./../controllers/checkOutController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/pay').post(checkOutController.pay);
router.route('/success').get(checkOutController.success);
router.route('/cancel').get(checkOutController.cancel);
module.exports = router;
