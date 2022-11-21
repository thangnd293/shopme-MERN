const mongoose = require("mongoose");
const slugify = require("slugify");
const AppError = require("../utils/appError");
const Filter = require("./filter");
// const appError = require('./../utils/appError');
const Category = require("./category");

const productSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      require: [true, "Please enter product name!!"],
    },
    categories: [String],
    brandId: String,
    brand: {
      type: String,
      ref: "Filter",
    },
    color: {
      type: String,
      ref: "Filter",
    },
    price: Number,
    discountPrice: Number,
    imageCovers: [String],
    images: [String],
    longDescription: String,
    shortDescription: String,
    categoryPath: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: String,
    filters: [
      {
        type: String,
        ref: "Filter",
      },
    ],
    facets: [
      {
        _id: String,
        name: String,
        type: {
          type: String,
        },
      },
    ],
    createAt: {
      type: Date,
      default: Date.now(),
    },
    variants: [
      {
        price: {
          type: Number,
          min: [1, "Price must be more than 1$"],
        },
        discountPrice: {
          type: Number,
          validate: {
            validator: function (value) {
              return this.price >= value && value >= 0;
            },
            message:
              "Discount price must be less than the original price and greater than 0$!!",
          },
        },
        sizeId: {
          type: String,
          ref: "Filter",
          require: true,
        },
        size: String,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.index({ facets: 1 });
productSchema.index({ categoryPath: 1 });

// Xu ly truoc khi duoc luu vao DB
productSchema.pre("save", async function (next) {
  // Render ID for Product
  if (!this._id) {
    let id = Math.ceil(Math.random() * 100000);
    while (await Product.findById(id)) {
      id = Math.ceil(Math.random() * 100000);
    }
    this._id = id;
  }

  this.slug = slugify(this.name, { lower: true });
  this.facets = [];
  const brand = await Filter.findById(this.brandId).lean();
  const color = await Filter.findById(this.color).lean();

  if (!brand) {
    return next(
      new AppError("Brand does not exist. Please try again later.", 404)
    );
  }

  this.brand = brand.name;

  if (!color) {
    return next(
      new AppError("Color does not exist. Please try again later.", 404)
    );
  }

  this.facets.push({
    _id: brand._id,
    type: brand.type,
    name: brand.name,
  });

  this.facets.push({
    _id: color._id,
    type: color.type,
    name: color.name,
  });

  if (!this.categories || this.categories.length === 0) {
    return next(
      new AppError(
        "A product must belong to at least one product category!!",
        400
      )
    );
  }

  this.categoryPath = "";
  await Promise.all(
    this.categories.map(async (id) => {
      const category = await Category.findById(id).lean();
      if (!category) {
        return next(
          new AppError("Category does not exist. Please try again.", 404)
        );
      }
      this.categoryPath += `${category.path};`;
    })
  );

  await Promise.all(
    this.filters.map(async (id) => {
      const filter = await Filter.findById(id).lean();
      if (!filter) {
        return next(
          new AppError("Filter does not exist. Please try again later.")
        );
      }
      this.facets.push({
        _id: filter._id,
        type: filter.type,
        name: filter.name,
      });
    })
  );

  if (!this.variants || this.variants.length === 0) {
    this.price = 0;
    this.discountPrice = 0;
    return next();
  }

  let price = 99999;
  let discountPrice = 99999;

  await Promise.all(
    this.variants?.map(async (variant) => {
      if (!variant.price) {
        return next(
          new AppError("Please enter the price of the variant!!", 400)
        );
      }

      if (!variant.discountPrice) {
        variant.discountPrice = variant.price;
      }

      let count = 0;
      this.variants.forEach((v) => {
        if (v.sizeId == variant.sizeId) {
          count++;
        }
      });

      if (count === 2) {
        return next(
          new AppError("Variant already exists. Please try again!!", 400)
        );
      }

      const filter = await Filter.findById(variant.sizeId).lean();

      if (variant.sizeId && !filter) {
        return next(
          new AppError(`Size does not exist. Please try again later.`, 404)
        );
      }

      variant.size = filter?.name;

      this.facets.push({
        _id: filter?._id,
        type: filter?.type,
        name: filter?.name,
      });

      if (variant.price < price) {
        price = variant.price;
        discountPrice = variant.discountPrice;
      }
    })
  );

  this.price = price;
  this.discountPrice = discountPrice;

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
