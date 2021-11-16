const multer = require('multer');
const sharp = require('sharp');

const Product = require(`${__dirname}/../models/product`);
const Category = require('./../models/category');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const ProductVariation = require('./../models/productVariations');

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

exports.uploadProductImages = upload.fields([
  { name: 'imageCovers', maxCount: 2 },
  { name: 'images', maxCount: 10 },
]);

exports.resizeProductImages = async function (req, res, next) {
  if (!req.files.imageCovers || !req.files.images) {
    return next();
  }
  req.body.imageCovers = [];
  await Promise.all(
    req.files.imageCovers.map(async (imageCover, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-cover-${
        i + 1
      }.jpeg`;

      await sharp(imageCover.buffer)
        .resize(1600, 1600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);
      req.body.imageCovers.push(filename);
    })
  );

  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (image, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(image.buffer)
        .resize(1600, 1600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);
      req.body.images.push(filename);
    })
  );

  next();
};
exports.setCategoryPath = catchAsync(async function (req, res, next) {
  if (!req.body.category) {
    return next();
  }

  const category = await Category.findById(`${req.body.category}`);

  if (!category) {
    return next(new AppError('Không tìm thấy loại sản phẩm tương ứng!!', 404));
  }

  req.body.categoryName = category.name;
  req.body.categoryPath = category.path;
  next();
});

exports.updateProduct = catchAsync(async function (req, res, next) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Invalid ID!!', 404));
  }
  product.set(req.body);

  await product.save();

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    const category = await Category.findById(req.params.categoryId).lean();
    if (!category) {
      return next(new AppError('ID không hợp lệ', 400));
    }

    if (req.params.categoryId.startsWith('88')) {
      filter = { brand: category.name };

      if (
        req.params.categoryId === '8836' ||
        req.params.categoryId === '8837' ||
        req.params.categoryId === '8893'
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
    .select('-filters -facets -createAt -longDescription -shortDescription')
    .lean();

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc,
  });
});

exports.getFacets = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(new AppError('ID không hợp lệ', 400));
  }

  const p = { categoryPath: new RegExp(`${category.path}`) };
  const filters = await Product.aggregate([
    { $match: p },
    { $unwind: '$facets' },
    {
      $group: {
        _id: '$facets',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  filters.sort(function (a, b) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
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
    status: 'success',
    data: facets,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .select('-filters -facets -createAt')
    .lean();
  if (!product) {
    return next(new AppError('No matching products found!!', 404));
  }
  console.log(product);
  let variants = ProductVariation.find({ product: product._id }).select('-__v');
  variants.flag = true;
  variants = await variants.lean();
  product.variants = variants;

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { variants, ...objBody } = req.body;
  const product = await Product.create(objBody);
  let vars = [];
  try {
    vars = await Promise.all(
      variants.map(
        async (v) =>
          await ProductVariation.create({
            product: product._id,
            ...v,
          })
      )
    );
  } catch (err) {
    await ProductVariation.deleteMany({ product: product._id });
    await Product.findByIdAndDelete(product._id);
    return next(new AppError(err.message, 400));
  }
  const productObj = { ...product._doc, variants: vars };
  res.status(200).json({
    status: 'success',
    data: productObj,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('ID không tồn tại!!', 404));
  }
  await ProductVariation.deleteMany({ product: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getProductFeatured = catchAsync(async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  const product = await Product.find({ isFeatured: true })
    .limit(+count)
    .lean();

  res.status(200).json({
    status: 'success',
    results: product.length,
    data: product,
  });
});
