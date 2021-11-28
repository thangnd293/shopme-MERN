const express = require('express');
const billController = require('./../controllers/billController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/').post(billController.createBill);
module.exports = router;
