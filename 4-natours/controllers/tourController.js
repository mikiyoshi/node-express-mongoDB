// const fs = require('fs');
const Tour = require('./../models/tourModel');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// 2) ROUTE HANDLERS
exports.getAllTours = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const tours = await query;
  const tours = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // try {
  const tour = await Tour.findById(req.params.id); // req.params.id come from router.route('/:id') of tourRoutes.js
  // Tour.findOne({ _id: req.params.id })

  // test at postman "127.0.0.1:3000/api/v1/tours/6287eac34fd5da374a4cb375" 最後の数字のみ変更して、存在しないIDを検索
  // result in postman
  //   {
  //     "status": "success",
  //     "data": {
  //         "tour": null
  //     }
  // }
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // import "AppError" in top of this file
  }
  // after update test at postman "127.0.0.1:3000/api/v1/tours/6287eac34fd5da374a4cb375" 最後の数字のみ変更して、存在しないIDを検索
  // result in postman
  //   {
  //     "status": "fail",
  //     "message": "No tour found with that ID"
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

// // Implement // export to catchAsync.js
// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  // mongoose documentation is very important!!!! 重要!!!
  // .findByIdAndUpdate documentation from mongoose
  // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  // A.findByIdAndUpdate(id, update, options)  // returns Query
  // Options:
  // new: bool - true to return the modified document rather than the original. defaults to false
  // runValidators: if true, runs update validators on this command. Update validators validate the update
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true // this is validator // runValidators: false is not work validator of tourModule.js
  });

  // same as getTour
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // import "AppError" in top of this file
  }

  res.status(200).json({
    status: 'success',
    data: {
      // tour: '<Updated tour here...>',
      // tour: tour
      tour
    }
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id); // create "tour" parameter

  // same as getTour and create "tour" parameter
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); // import "AppError" in top of this file
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// aggregation pipeline // 集計パイプライン データを集計してソートやフィルターができる
// https://www.mongodb.com/docs/manual/reference/operator/query/ // $gte: Matches values that are greater than or equal to a specified value.
// https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/ // $match
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' }, // 平均難度別 $toUpper は大文字表記
        // _id: '$ratingsAverage', // 平均レビュー別
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 } // avgPrice を降順(-1 昇順)に並び替える
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }, // excluding 'EASY' //'EASY' を除外する
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

// Document from Aggregation Pipeline Operators of MongoDB
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/ // $week $month
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numTourStars: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});
