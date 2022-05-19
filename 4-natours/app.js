const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
// setting by package.json and npm run start:dev or npm run start:prod result in Terminal
//
// development
// App running on port 3000...
// Hello from the middleware 👋
// 2022-05-19T17:45:24.597Z
// GET /api/v1/tours 200 3.834 ms - 8809
//
// production
// App running on port 3000...
// Hello from the middleware 👋
// 2022-05-19T17:45:13.794Z
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
