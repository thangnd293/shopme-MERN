const express = require('express');
const filterController = require('./../controllers/filterController');

const router = express.Router();

router.route('/root').get(filterController.getRoot);
router.route('/clothing-sizes').get(filterController.getClothingSizes);
router.route('/shoe-sizes').get(filterController.shoeSizes);
router.route('/:id').get(filterController.getAllOfRoot);
// .post(filterController.createFilter);

module.exports = router;
