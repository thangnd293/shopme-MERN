const express = require('express');
const variationController = require('./../controllers/variationController');
const filterController = require('./../controllers/filterController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(variationController.getAllVariation)
  .post(variationController.createVariation);

router
  .route('/:id')
  .get(variationController.getVariation)
  .patch(variationController.updateVariation)
  .delete(variationController.deleteVariation);

module.exports = router;
