// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const APIFeatures = require('./../utils/apiFeatures'); // import at handlerFactory.js
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// 2) ROUTE HANDLERS
exports.getAllTours = factory.getAll(Tour);

exports.getTour = factory.getOne(Tour, { path: 'reviews' });

exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

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

// this is from tourRoutes.js
// '/tours-within/:distance/center/:latlng/unit/:unit'
// /tours-within/233/center/34.111745,-118.113491/unit/mi // mi is miles
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1; // mi is miles

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat, lng.',
        400
      )
    );
  }

  // console.log(distance, lat, lng, unit);
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001; // 1 meter to miles

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat, lng.',
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});
// test at postman "Get Distances to Tours From Point"
// {{URL}}api/v1/tours/distances/34.111745,-118.113491/unit/mi // this is miles
// {{URL}}api/v1/tours/distances/34.111745,-118.113491/unit/km // this is km
// result in postman // 距離が近い順に表示される
// "status": "success",
// "data": {
//     "data": [
//         {
//             "_id": "5c88fa8cf4afda39709c2966",
//             "name": "The Sports Lover",
//             "distance": 40.208593926228964 // km is 64.70947940317292
//         },
//         {
//             "_id": "5c88fa8cf4afda39709c2961",
//             "name": "The Park Camper",
//             "distance": 216.34066637146643 // km is 348.1666610953302
//         },
