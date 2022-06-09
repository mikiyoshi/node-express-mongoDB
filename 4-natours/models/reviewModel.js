// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    cratedAt: {
      type: Date,
      default: Date.now
    },
    tour: {
      // what tour belong to
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      // who wrote this review
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.']
    }
  },
  {
    // this virtual properties output as JSON and Object
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  this.populate({
    // .populate can get a detail property result
    path: 'user', // this is reviewSchema.user line around 25
    select: 'name photo' // get name and photo properties // -(マイナス)name -(マイナス)photo means without name and photo properties
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  // console.log(tourId);
  const stats = await this.aggregate([
    // aggregation pipeline // aggregate 総計の, 総合の; 集合した
    {
      $match: { tour: tourId } // tourId に一致(含む)する
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 }, // number of rating
        avgRating: { $avg: '$rating' } // average rating
      }
    }
  ]);
  // console.log(stats);

  // check at least 1 review or not
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating, // if one review delete, it has error rating average
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  // this points to current review

  this.constructor.calcAverageRatings(this.tour);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  // const r = await this.findOne();
  this.r = await this.findOne();
  // console.log(this.r);
  next();
}); // この状態では update 後のデータを review の平均と合計に計算させていない

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
