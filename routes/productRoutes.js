const express = require("express");

const productController = require(`${__dirname}/../controllers/productController`);
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/features/:count").get(productController.getProductFeatured);
router.route("/features").get(productController.getProductFeatured);

router.route("/facets").get(productController.getFacets);

router.route("/search").get(productController.findProducts);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.use(authController.restrictTo("admin"));

router.route("/").post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
module.exports = router;
