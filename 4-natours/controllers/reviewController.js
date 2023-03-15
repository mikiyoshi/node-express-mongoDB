const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review); // exports.getAll at ./handlerFactory

exports.getReview = factory.getOne(Review); // exports.getOne at ./handlerFactory
exports.createReview = factory.createOne(Review); // exports.createOne at ./handlerFactory
exports.updateReview = factory.updateOne(Review); // exports.updateOne at ./handlerFactory
exports.deleteReview = factory.deleteOne(Review); // exports.deleteOne at ./handlerFactory
