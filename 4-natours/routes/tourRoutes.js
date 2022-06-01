const express = require('express');

const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router(); // replace from tourRouter to router

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// aggregation pipeline // 集計パイプライン データを集計してソートやフィルターができる
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours) // get a authController.protect from "tourRoutes.js"
  .post(tourController.createTour); // .post(middleware, tourController.createTour); middleware import from tourController
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router; // replace from tourRouter to router
