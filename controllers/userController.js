const multer = require('multer');
const sharp = require('sharp');

const User = require(`./../models/user`);
const catchAsync = require(`./../utils/catchAsync`);
const AppError = require(`./../utils/appError`);
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/img/users');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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
  const obj = filterObj(req.body, 'fname', 'lname', 'photo');
  if (req.file) {
    obj.photo = req.file.filename;
  }
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
