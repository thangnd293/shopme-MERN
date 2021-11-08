const Category = require('./../models/category');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCategories = catchAsync(async function (req, res, next) {
  let categories = await Category.find();
  let result = [];

  categories.forEach((obj) => {
    if (obj.level === 1) {
      const newObj = Object.assign(obj._doc, { children: [] });
      result.push(newObj);
    }
  });

  for (const ancestor of result) {
    categories.forEach((parent) => {
      if (parent.level === 2 && parent.parent === ancestor.path) {
        const newObj = Object.assign(parent._doc, { children: [] });
        categories.forEach((child) => {
          if (child.level === 3 && child.parent === newObj.path) {
            newObj.children.push(child);
          }
        });
        ancestor.children.push(newObj);
      }
    });
  }
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.getAllSubCategory = catchAsync(async function (req, res, next) {
  const category = await Category.findById(req.params.id);

  const subCategories = await Category.find({
    parent: category.path,
  });

  console.log(subCategories);
  res.status(200).json({
    status: 'success',
    result: subCategories.length,
    data: subCategories,
  });
});
