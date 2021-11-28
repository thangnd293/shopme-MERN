const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lname: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Invalid email!!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: [
    {
      street: {
        type: String,
        require: true,
      },
      detail: {
        type: String,
        require: true,
      },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  changePasswordAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  verifyCode: String,
  verifyExpires: Date,
});

userSchema.index(
  { verifyExpires: 1 },
  { expireAfterSeconds: 0 }
);

// Mã hóa mật khẩu trước khi lưu vào DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Đánh dấu thời gian thay đổi mật khẩu
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.changePasswordAt = Date.now() - 1000;
  next();
});

// Kiểm tra password người dùng nhập và mật khẩu lưu trong DB
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Kiểm tra dấu thời gian thay đổi password và thời gian sử dụng token
// Nếu password thay đổi sau khi token được cấp thì trả về false
userSchema.methods.changePasswordAfter = function (
  changePasswordTimestamp,
  jwtTimestamp
) {
  if (changePasswordTimestamp) {
    const passwordTimestamp = Math.ceil(
      changePasswordTimestamp.getTime() / 1000
    );
    return passwordTimestamp > jwtTimestamp;
  }
  return false;
};

// Tạo token reset password cho user
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Tạo code xác nhận cho user

userSchema.methods.createVerifyCode = function () {
  const verifyCode = `${Math.floor(Math.random()*900000) + 100000}`;
  this.verifyCode = verifyCode;
  this.verifyExpires = Date.now() + process.env.TIME_VERIFY * 60 * 1000;

  return verifyCode;
};

userSchema.methods.createResetCode = function () {
  const resetCode = `${Math.floor(Math.random()*900000) + 100000}`;
  this.passwordResetCode = resetCode;
  this.passwordResetExpires = Date.now() + process.env.TIME_RESET * 60 * 1000;

  return resetCode;
};
// userSchema.methods.createVerifyToken = function () {
//   const verifyToken = crypto.randomBytes(32).toString('hex');
//   this.verifyToken = crypto
//     .createHash('sha256')
//     .update(verifyToken)
//     .digest('hex');
//   this.verifyExpires = Date.now() + process.env.TIME_VERIFY * 60;

//   return verifyToken;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
