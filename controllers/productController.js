// const multer = require('multer');
// const sharp = require('sharp');
const mongoose = require("mongoose");

const Product = require(`${__dirname}/../models/product`);
const Category = require("./../models/category");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), true);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadProductImages = upload.fields([
//   { name: 'imageCovers', maxCount: 2 },
//   { name: 'images', maxCount: 10 },
// ]);

// exports.resizeProductImages = async function (req, res, next) {
//   if (!req.files.imageCovers || !req.files.images) {
//     return next();
//   }
//   req.body.imageCovers = [];
//   await Promise.all(
//     req.files.imageCovers.map(async (imageCover, i) => {
//       const filename = `product-${req.params.id}-${Date.now()}-cover-${
//         i + 1
//       }.jpeg`;

//       await sharp(imageCover.buffer)
//         .resize(1600, 1600)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/products/${filename}`);
//       req.body.imageCovers.push(filename);
//     })
//   );

//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (image, i) => {
//       const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(image.buffer)
//         .resize(1600, 1600)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/products/${filename}`);
//       req.body.images.push(filename);
//     })
//   );

//   next();
// };

exports.updateProduct = catchAsync(async function (req, res, next) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Invalid ID!!", 404));
  }
  const body = req.body;
  delete body.__v;
  product.set(body);

  await product.save();

  res.status(200).json({
    status: "Success",
    data: product,
  });
}); //done

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    const category = await Category.findById(req.params.categoryId).lean();
    if (!category) {
      return next(new AppError("ID không hợp lệ", 400));
    }
    if (req.params.categoryId.startsWith("88")) {
      filter = { brand: category.name };

      if (
        req.params.categoryId === "8836" ||
        req.params.categoryId === "8837" ||
        req.params.categoryId === "8893"
      ) {
        filter = { brand: { $ne: null } };
      }
    } else {
      filter = { categoryPath: new RegExp(`${category.path}`) };
    }
  }
  const features = new APIFeatures(Product.find(filter), req.query)
    .filterFacets()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query
    .select("-facets -createAt -longDescription -shortDescription -categories")
    .lean();

  res.status(200).json({
    status: "Success",
    results: doc.length,
    data: doc,
  });
}); //done

exports.findProducts = catchAsync(async (req, res, next) => {
  const { key } = req.query;
  const filter = {
    name: {
      $regex: key,
      $options: "i",
    },
  };

  const features = new APIFeatures(Product.find(filter), req.query)
    .filterFacets()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query
    .select(
      "-filters -facets -createAt -longDescription -shortDescription -categories"
    )
    .lean();

  res.status(200).json({
    status: "Success",
    results: doc.length,
    data: doc,
  });
}); //done

exports.getFacets = catchAsync(async (req, res, next) => {
  // const { categoryId, key } = req.query;
  // let query;
  // if (categoryId) {
  //   const category = await Category.findById(categoryId);
  //   if (categoryId.startsWith('88')) {
  //     query = { brand: category.name };
  //     if (
  //       categoryId === '8836' ||
  //       categoryId === '8837' ||
  //       categoryId === '8893'
  //     ) {
  //       query = {};
  //     }
  //     console.log(query);
  //   } else {
  //     query = { categoryPath: new RegExp(`${category.path}`) };
  //   }
  // } else {
  //   query = { name: { $regex: key, $options: 'i' } };
  // }
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  let query = {};
  if (categoryId.startsWith("88")) {
    query = { brand: category.name };
    if (
      categoryId === "8836" ||
      categoryId === "8837" ||
      categoryId === "8893"
    ) {
      query = {};
    }
  } else {
    query = { categoryPath: new RegExp(`${category.path}`) };
  }

  const f = await Product.aggregate([
    { $match: query },
    { $unwind: "$facets" },
    {
      $group: {
        _id: "$facets",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  f.sort(function (a, b) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
  });

  const filters = [];
  f.forEach((filter, i) => {
    if (Object.keys(f[i]._id).length !== 0) {
      filters.push({ ...f[i] });
    }
  });

  const facets = [];
  if (filters.length !== 0) {
    facets.push({
      name: filters[0]._id.type,
      values: [
        {
          name: filters[0]._id.name,
          id: filters[0]._id._id,
        },
      ],
    });
    let i = 1;
    let count = 0;
    for (i; i < filters.length; i++) {
      if (filters[i]._id.type !== filters[i - 1]._id.type) {
        facets.push({
          name: filters[i]._id.type,
          values: [],
        });
        count++;
      }
      facets[count].values.push({
        name: filters[i]._id.name,
        id: filters[i]._id._id,
      });
    }
  }

  res.status(200).json({
    status: "Success",
    data: facets,
  });
}); //done

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .select("-facets -createAt")
    .lean();
  if (!product) {
    return next(new AppError("No matching products found!!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: product,
  });
}); //done

exports.createProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.getProductFeatured = catchAsync(async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  const product = await Product.find({ isFeatured: true })
    .limit(+count)
    .lean();

  res.status(200).json({
    status: "Success",
    results: product.length,
    data: product,
  });
});
