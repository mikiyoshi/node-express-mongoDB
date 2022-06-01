const AppError = require('./../utils/appError');

// production error validation at postman "Get Tour"
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`; // result production error in postman
  return new AppError(message, 400);
};

// production error validation at postman "Create Tour"
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // Regex 正規表現
  // test at postman "Create Tour"
  // body
  //  {
  //     "name": "The Forest Hiker",
  //     "duration": 1,
  //     "maxGroupSize": 1,
  //     "difficulty": "easy",
  //     "price": 200,
  //     "summary": "Test tour",
  //     "imageCover": "tour-3-cover.jpg",
  //     "ratingsAverage": 4
  // }
  // result development error in postman
  // "errmsg": "E11000 duplicate key error collection: natours.tours index: name_1 dup key: { name: \"The Forest Hiker\" }",
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value! `; // result production error in postman
  return new AppError(message, 400);
};

// production error validation at postman "Get All Tours" with header KEY: Authorization, VALUE: Bearer errorTokenID
// const handleJWTError = err => // for production test when config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);
// test at postman "Get All Tours" with header
// result production error in postman
// {
//   "status": "fail",
//   "message": "Invalid token. Please log in again!"
// }
// if we update config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
// test at postman "Login", then copy token and paste "Get All Tours" with header VALUE: Bearer
// result production error in postman
// {
//   "status": "error",
//   "message": "Something went very wrong!"
// }

// const handleJWTExpiredError = err => // for production test when config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again', 401);
// if we update config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
// test at postman "Login", then copy token and paste "Get All Tours" with header VALUE: Bearer
// result production error in postman
// {
//     "status": "fail",
//     "message": "Your token has expired! Please log in again"
// }

// production error validation at postman "Update Tour"
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  // test at postman "Update Tour"
  // result development error in postman
  // "error": {
  //   "errors": { // err.errors
  //       "name": { // value = el
  //           "message": "A tour name must have more or equal then 10 characters",  // el.message
  //           "name": "ValidatorError",
  //           "properties": {
  //               "message": "A tour name must have more or equal then 10 characters",
  //           },
  //           "kind": "minlength"
  //       },
  const message = `Invalid input data. ${errors.join('. ')}`; // result production error in postman
  // .join('. ') is divide each error message by ('. ')
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack)

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }; // duplicate err from "module.exports = (err, req, res, next)"

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    // if (error.name === 'JsonWebTokenError') error = handleJWTError(error);  // for production test when config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    // if (error.name === 'TokenExpiredError')
    //   error = handleJWTExpiredError(error);  // for production test when config.env from JWT_EXPIRES_IN=90d to JWT_EXPIRES_IN=5000
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
