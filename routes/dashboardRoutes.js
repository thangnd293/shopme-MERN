const express = require('express');

const dashboardController = require('./../controllers/dashboardController');

const router = express.Router();

router.route('/data').get(dashboardController.getData);

module.exports = router;
