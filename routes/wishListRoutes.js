const express = require('express');
const wishListController = require('./../controllers/wishListController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);
router.use(wishListController.prepareWishList);
router.route('/').get(wishListController.getWishList);
router.route('/add').post(wishListController.addToWishList);
router.route('/remove').get(wishListController.removeFromWishList);

module.exports = router;
