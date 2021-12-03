const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const Product = require("./models/product");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishListRoutes = require("./routes/wishListRoutes");
const billRoutes = require("./routes/billRoutes");
const filterRoutes = require("./routes/filterRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const AppError = require(`${__dirname}/utils/appError`);
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const cors = require("cors");

app.use(cors());

app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));
app.use(express.static("public"));

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishListRoutes);
app.use("/api/v1/bill", billRoutes);
app.use("/api/v1/filters", filterRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use(
  "/api/v1/insert",
  express.Router().post("/", async (req, res, next) => {
    const data = req.body.data;
    try {
      await Promise.all(
        data.map(async (p) => {
          await Product.create(p);
        })
      );
    } catch (err) {
      console.log(err);
    }

    res.send(200);
  })
);

app.all("*", function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Bắt lỗi người dùng truy cập vào link không xác định
app.use(globalErrorHandler);

module.exports = app;
