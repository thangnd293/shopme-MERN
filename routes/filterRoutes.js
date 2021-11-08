const express = require('express');
const filterController = require('./../controllers/filterController');

const router = express.Router();

router
  .route('/')
  //   .get(variationController.getAllVariation)
  .post(filterController.createFilter);
