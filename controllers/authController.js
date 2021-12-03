const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("./../models/user");
const sendEmail = require("./../utils/email");
const catchAsync = require("./../utils/catchAsync");
const AppError = require(`./../utils/appError`);

const createToken = function (id, lname, fname) {
  return jwt.sign({ id, lname, fname }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = function (user, code, res) {
  const token = createToken(user._id, user.lname, user.fname);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOption);
  res.status(code).json({
    status: "Success",
    token,
    data: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      photo: user.photo,
      phoneNumber: user.phoneNumber,
    },
  });
};

exports.protect = catchAsync(async function (req, res, next) {
  // 1. Lay token
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("You are not logged in", 401));

  // 2. Xac thuc token
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3. Kiem tra xem nguoi dung con ton tai khong
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  //4. Kiem tra thoi gian thay doi mat khau cua user voi thoi gian duoc cap token
  if (
    currentUser.changePasswordAfter(currentUser.changePasswordAt, decode.iat)
  ) {
    return next(
      new AppError("User recently changed password. Please log in again")
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission!!!"));
    }
    return next();
  };
};

exports.signup = catchAsync(async (req, res, next) => {
  //1. Lấy dữ liệu user nhập
  const newUserObj = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phoneNumber: req.body.phoneNumber,
  };
  let newUser;
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user && !user.isVerified) {
      await User.findByIdAndDelete(user._id);
    }

    newUser = await User.create(newUserObj);
  } catch (e) {
    return next(
      new AppError("Email already exists, please use another email", 400)
    );
  }

  //2. Tạo code xác nhận email
  const verifyCode = newUser.createVerifyCode();
  await newUser.save({ validateBeforeSave: false });
  // 3. Gui toi email Code de user verify email
  let html = fs.readFileSync(`${__dirname}/../emailtemplate/emailVerify.html`, {
    encoding: "utf-8",
  });
  html = html.replace("<%NAME>", newUser.fname);
  html = html.replace("<%CODE>", verifyCode);
  const subject = "Verify your account";
  // Neu email gui khong thanh cong thi phai reset verifyCode va verifyExpires

  try {
    await sendEmail({
      email: newUser.email,
      subject,
      html,
    });

    res.status(200).json({
      status: "Success",
      message: "Code sent to email",
      email: newUser.email,
    });
  } catch (err) {
    newUser.verifyCode = undefined;
    newUser.verifyExpires = undefined;
    await newUser.save({ validateBeforeSave: false });
    next(new AppError(err), 500);
  }
});

exports.verify = catchAsync(async (req, res, next) => {
  // 1. Lay user tuong ung
  const email = req.body.email;
  const verifyCode = req.body.verifyCode;
  const user = await User.findOne({
    email: email,
    verifyCode: verifyCode,
    verifyExpires: { $gt: Date.now() },
  });

  // 2. Kiem tra neu token hop le(con thoi gian su dung)
  if (!user) {
    return next(new AppError("Verification failed!!"), 400);
  }

  user.isVerified = true;
  user.verifyCode = undefined;
  user.verifyExpires = undefined;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  // Kiem tra dau vao hop le
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));
  // Kiem tra tai khoan & mat khau
  const user = await User.findOne({ email, isVerified: true }).select(
    "+password"
  );

  // const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // Gui token ve cho client
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async function (req, res, next) {
  // 1. Kiem tra email co ton tai hay khong
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address"), 404);
  }
  // 2. Tao token reset password
  const resetCode = user.createResetCode();
  await user.save({ validateBeforeSave: false });
  // 3. Gui toi email token de user reset password

  // let html = fs.readFileSync(
  //   `${__dirname}/../emailtemplate/resetPassword.html`,
  //   {
  //     encoding: "utf-8",
  //   }
  // );
  let html = fs.readFileSync(
    `${__dirname}/../emailtemplate/resetPassword.html`,
    {
      encoding: "utf-8",
    }
  );

  html = html.replace("<%CODE>", resetCode);
  const subject = "Forgot your password";
  // Neu email gui khong thanh cong thi phai reset passwordResetCode va passwordResetExpires
  try {
    await sendEmail({
      email: user.email,
      subject,
      html,
    });

    res.status(200).json({
      status: "Success",
      message: "Code sent to email",
      email: user.email,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next(new AppError("There was an error sending the email"), 500);
  }
});

exports.resetPassword = catchAsync(async function (req, res, next) {
  // 1. Lay user tuong ung
  const email = req.body.email;
  const resetCode = req.body.resetCode;
  const user = await User.findOne({
    email: email,
    passwordResetCode: resetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2. Kiem tra neu token hop le(con thoi gian su dung) thi doi mat khau
  if (!user) {
    return next(new AppError("Invalid token reset password!!"), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3. Cap nhat changePasswordAt(Su dung middleware function)

  // 4. Login nguoi dung
  createSendToken(user, 200, res);
});

// Cap nhat mat khau cho user da login
exports.updatePassword = catchAsync(async function (req, res, next) {
  // 1. Lay thong tin cua nguoi dung
  const user = await User.findById(req.user.id).select("+password");
  // 2. Kiem tra mat khau nguoi dung nhap co dung voi mk hien tai khong
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError("Password incorrect. Please try again"), 401);
  }
  // 3. Cap nhat mat khau
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Dang nhap user, cap JWT moi cho user
  createSendToken(user, 200, res);
});
