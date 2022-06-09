const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// copy and update(Model and doc) exports.deleteTour from tourController.js
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

// copy and update(Model and doc) exports.updateTour from tourController.js
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// copy and update(Model and doc) exports.createTour from tourController.js
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// copy and update(Model and doc) exports.getTour from tourController.js
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    // const doc = await Model.findById(req.params.id).populate('reviews');

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// copy and update(Model and doc) exports.getAllTours from tourController.js
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested Get reviews on tour (hack) // update exports.getAllReviews to reviewController.js
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query) // add filter in Model.find() (hack)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    // test at postman "Get All Tours"
    // result in postman
    // "results": 3, // there is no "executionStats"

    // const doc = await features.query.explain(); // .explain() with "tourSchema.index" at tourModel.js can check how much heavy data sort or something in MongoDB indexes
    // test at postman "Get All Tours"
    // result in postman
    // "results": 1,
    //
    // "executionStats": {
    //   "executionSuccess": true,
    //   "nReturned": 3,
    //   "executionTimeMillis": 1,
    //   "totalKeysExamined": 3,
    //   "totalDocsExamined": 3,

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
