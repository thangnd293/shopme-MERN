const express = require('express');

const categoryController = require('./../controllers/categoryController');
const productRoutes = require('./productRoutes');

const router = express.Router();

router.use('/:categoryId/products/', productRoutes);

router.route('/').get(categoryController.getAllCategories);

router.route('/:id').get(categoryController.getAllSubCategory);

module.exports = router;
