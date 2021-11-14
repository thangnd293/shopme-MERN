const express = require('express');

const productController = require(`${__dirname}/../controllers/productController`);
const authController = require('./../controllers/authController');
const variationRoutes = require('./variationRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:id/variations/', variationRoutes);

router.route('/features/:count').get(productController.getProductFeatured);
router.route('/features').get(productController.getProductFeatured);

router.route('/facets').get(productController.getFacets);
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.setCategoryPath, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.setCategoryPath,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
