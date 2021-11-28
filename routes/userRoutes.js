const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/verify', authController.verify);
router.post('/sendVerify', authController.sendVerify);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.route('/reset-password').patch(authController.resetPassword);

// Phải đăng nhập trước
router.use(authController.protect);

router.patch('/update-password', authController.updatePassword);
router.patch(
  '/update-me',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.get('/me', userController.getMe, userController.getUser);

// Chỉ Admin có quyền
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
