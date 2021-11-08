const Filter = require('./../models/filter');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.createFilter = factory.createOne(Filter);
// exports.getAllFilter = factory.createOne(Filter);
