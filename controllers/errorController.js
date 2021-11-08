const AppError = require('./../utils/appError.js');

const handleTokenExpiredError = function () {
  return new AppError('Your token has expired. Please log in again', 401);
};

const handleJsonWebTokenError = function () {
  return new AppError('Invalid token. Please log in again', 401);
};

const handleCastErrorDB = function (err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDB = function (err) {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidatorErrorDB = function (err) {
  const errors = Object.values(err.errors).map((obj) => obj.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

const sendErrorProd = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

// Hàm xử lý lỗi người dùng truy cập vào link không xác định
module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'developer') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(err);
    }

    if (err.code === 11000) {
      error = handleDuplicateDB(err);
    }

    if (err.name === 'ValidationError') {
      error = handleValidatorErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    }

    if (err.name === 'TokenExpiredError') {
      error = handleTokenExpiredError();
    }

    sendErrorProd(error, res);
  }
};
