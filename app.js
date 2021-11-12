const express = require('express');
const morgan = require('morgan');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const variationRoutes = require('./routes/variationRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishListRoutes = require('./routes/wishListRoutes');
const checkOutRoutes = require('./routes/checkOutRoutes');
const AppError = require(`${__dirname}/utils/appError`);
const globalErrorHandler = require('./controllers/errorController');
const app = express();
const cors = require('cors');
const multer = require('multer');

app.use(cors());

app.options('*', cors());

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/variations', variationRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishListRoutes);
app.use('/api/v1/checkout', checkOutRoutes);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.all('*', function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Bắt lỗi người dùng truy cập vào link không xác định
app.use(globalErrorHandler);

module.exports = app;
