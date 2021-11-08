const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { truncate } = require('fs');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Vui lòng nhập tên của bạn'],
  },
  lname: {
    type: String,
    required: [true, 'Vui lòng nhập tên của bạn'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    validate: [validator.isEmail, 'Email không hợp lệ'],
  },
  photo: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [8, 'Mật khẩu phải chứa ít nhất 8 ký tự'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Vui lòng xác nhận mật khẩu'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Mật khẩu không khớp',
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
  passwordResetToken: String,
  passwordResetExpires: Date,
  verifyToken: String,
  verifyExpires: Date,
});

userSchema.index(
  { verifyExpires: 1 },
  { expireAfterSeconds: process.env.TIME_VERIFY * 60 }
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

// Tạo token xác nhận cho user
userSchema.methods.createVerifyToken = function () {
  const verifyToken = crypto.randomBytes(32).toString('hex');
  this.verifyToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');
  this.verifyExpires = Date.now() + process.env.TIME_VERIFY * 60 * 1000;

  return verifyToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
