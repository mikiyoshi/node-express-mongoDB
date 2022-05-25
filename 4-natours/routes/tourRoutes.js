const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router(); // replace from tourRouter to router

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// aggregation pipeline // 集計パイプライン データを集計してソートやフィルターができる
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // .post(middleware, tourController.createTour); middleware import from tourController
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router; // replace from tourRouter to router
