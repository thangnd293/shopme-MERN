const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');
const sendEmail = require('./../utils/email');
const catchAsync = require('./../utils/catchAsync');
const AppError = require(`./../utils/appError`);

const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = function (user, code, res) {
  const token = createToken(user._id);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOption);
  res.status(code).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.protect = catchAsync(async function (req, res, next) {
  // 1. Lay token
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in', 401));

  // 2. Xac thuc token
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3. Kiem tra xem nguoi dung con ton tai khong
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }
  //4. Kiem tra thoi gian thay doi mat khau cua user voi thoi gian duoc cap token
  if (
    currentUser.changePasswordAfter(currentUser.changePasswordAt, decode.iat)
  ) {
    return next(
      new AppError('User recently changed password. Please log in again')
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission!!!'));
    }
    return next();
  };
};

exports.signup = catchAsync(async (req, res, next) => {
  //1. Lấy dữ liệu user nhập
  try {
    const newUser = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phoneNumber: req.body.phoneNumber,
    });
  } catch (e) {
    return next(
      AppError('Email already exists, please use another email', 400)
    );
  }

  createSendToken(newUser, 200, res);
  //2. Tạo token xác nhận email
  // const verifyToken = newUser.createVerifyToken();
  // await newUser.save({ validateBeforeSave: false });
  // // 3. Gui toi email token de user reset password
  // const resetURL = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/verify/${verifyToken}`;
  // const message = `Press here to verify your account: ${resetURL}`;

  // // Neu email gui khong thanh cong thi phai reset verifyToken va verifyExpires
  // try {
  //   await sendEmail({
  //     email: newUser.email,
  //     subject: 'Verify your account (valid for 10 min)',
  //     message,
  //   });

  //   res.status(200).json({
  //     status: 'success',
  //     message: 'Token sent to email',
  //   });
  // } catch (err) {
  //   newUser.verifyToken = undefined;
  //   newUser.verifyExpires = undefined;
  //   await newUser.save({ validateBeforeSave: false });
  //   next(new AppError('There was an error sending the email'), 500);
  // }
});

exports.verify = catchAsync(async (req, res, next) => {
  // 1. Lay user tuong ung
  const verifyToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    verifyToken: verifyToken,
    verifyExpires: { $gt: Date.now() },
  });
  // 2. Kiem tra neu token hop le(con thoi gian su dung)
  if (!user) {
    return next(new AppError('Xác minh không thành công!!'), 400);
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyExpires = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
  });
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  // Kiem tra dau vao hop le
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));
  // Kiem tra tai khoan & mat khau
  // const user = await User.findOne({ email, isVerified: true }).select(
  //   '+password'
  // );

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // Gui token ve cho client
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async function (req, res, next) {
  // 1. Kiem tra email co ton tai hay khong
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address'), 404);
  }
  // 2. Tao token reset password
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3. Gui toi email token de user reset password
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}. If you didn't forgot your password, please ignore this email!`;

  // Neu email gui khong thanh cong thi phai reset passwordResetToken va passwordResetExpires
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next(new AppError('There was an error sending the email'), 500);
  }
});

exports.resetPassword = catchAsync(async function (req, res, next) {
  // 1. Lay user tuong ung
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. Kiem tra neu token hop le(con thoi gian su dung) thi doi mat khau
  if (!user) {
    return next(new AppError('Invalid token reset password!!'), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3. Cap nhat changePasswordAt(Su dung middleware function)

  // 4. Login nguoi dung
  createSendToken(user, 200, res);
});

// Cap nhat mat khau cho user da login
exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1. Lay thong tin cua nguoi dung
  const user = await User.findById(req.user.id).select('+password');
  // 2. Kiem tra mat khau nguoi dung nhap co dung voi mk hien tai khong
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError('Password incorrect. Please try again'), 401);
  }
  // 3. Cap nhat mat khau
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Dang nhap user, cap JWT moi cho user
  createSendToken(user, 200, res);
});
