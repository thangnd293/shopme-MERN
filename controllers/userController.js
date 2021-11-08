const User = require(`./../models/user`);

const catchAsync = require(`./../utils/catchAsync`);
const AppError = require(`./../utils/appError`);
const factory = require('./handlerFactory');

const filterObj = function (obj, ...fieldAllows) {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fieldAllows.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// middleware
exports.getMe = function (req, res, next) {
  req.params.id = req.user.id;

  next();
};

exports.updateMe = catchAsync(async function (req, res, next) {
  // 1. Kiem tra va bao loi neu nguoi dung co y thay doi mat khau
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }
  // 2. Loc du lieu
  const obj = filterObj(req.body, 'fname', 'lname');
  // 3. Thay doi du lieu va tra ve
  const newUser = await User.findByIdAndUpdate(req.user._id, obj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
