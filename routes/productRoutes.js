const express = require('express');

const productController = require(`${__dirname}/../controllers/productController`);
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use('/:id/variations/', variationRoutes);
router.route('/variants/:id').get(productController.getVariant);
router.route('/variants').get(productController.getAllVariants);
router.route('/:id/variants').post(productController.createVariant);

router
  .route('/:productId/variants/:id')
  .patch(productController.updateVariant)
  .delete(productController.deleteVariant);

router.route('/features/:count').get(productController.getProductFeatured);
router.route('/features').get(productController.getProductFeatured);

router.route('/facets').get(productController.getFacets);

router.route('/search').get(productController.findProducts);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
