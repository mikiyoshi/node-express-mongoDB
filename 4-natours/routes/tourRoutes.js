const express = require('express');

const tourController = require('./../controllers/tourController');
// OR each import
// const { getAllTours, createTour, getTour, updateTour, deleteTour } = require('./../controllers/tourController');

const router = express.Router(); // replace from tourRouter to router

// export in tourController
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`); // using postman and result in Terminal // Tour id is: 7
//   next();
// });

// import from tourController
router.param('id', tourController.checkID);

// Create a checkBody middleware
// Create if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); // .post(middleware, tourController.createTour); middleware import from tourController
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// OR each import
// router.route('/').get(getAllTours).post(createTour);
// router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router; // replace from tourRouter to router
