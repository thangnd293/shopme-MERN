const express = require('express');
const filterController = require('./../controllers/filterController');

const router = express.Router();

router.route('/').get(filterController.getAll);
router.route('/sizes').get(filterController.getSizes);
router.route('/colors').get(filterController.getColors);
router.route('/brands').get(filterController.getBrands);

module.exports = router;
