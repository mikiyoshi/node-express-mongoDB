const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true }); // merge '/:tourId/reviews' and '/reviews'

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    // authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds, // update exports.setTourUserIds to reviewController.js
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
