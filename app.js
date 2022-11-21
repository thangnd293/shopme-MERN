const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

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

app.use(cors());

app.options("*", cors());
app.use(helmet());

app.use(express.json({ limit: "25mb" }));

app.use(mongoSanitize());

app.use(xss());

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishListRoutes);
app.use("/api/v1/bill", billRoutes);
app.use("/api/v1/filters", filterRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.all("*", function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Bắt lỗi người dùng truy cập vào link không xác định
app.use(globalErrorHandler);

module.exports = app;
