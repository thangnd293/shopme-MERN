const express = require("express");
const billController = require("./../controllers/billController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .get(authController.restrictTo("admin"), billController.getAllBill)
  .post(billController.createBill);
router.route("/my-bill").get(billController.getMyBill);

module.exports = router;
