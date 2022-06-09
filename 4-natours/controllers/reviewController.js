const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');

// update exports.setTourUserIds to reviewRoutes.js
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
// update exports.getAll to handlerFactory.js
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'success',
//     result: reviews.length,
//     data: {
//       reviews
//     }
//   });
// });
//
// test at postman "Get All Reviews" {{URL}}api/v1/reviews?rating=4
// result in postman
// "status": "success",
// "results": 1,

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);