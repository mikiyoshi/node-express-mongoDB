const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], // data validator
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'], // data validator
      minlength: [10, 'A tour name must have more or equal then 10 characters'], // data validator
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
      // .isAlpha can not use " " and [0-9] ans special character
      // validator plugin // https://github.com/validatorjs/validator.js/
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      }, // data validator
    },
    ratingsAverage: {
      type: Number,
      default: 4.5, // this is default rate point
      min: [1, 'Rating must be above 1.0'], // data validator
      max: [5, 'Rating must be below 5.0'], // data validator
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    // document follow up from validator library
    // https://github.com/validatorjs/validator.js/
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation // work postman only "Create New Tour"
          return val < this.price; // 100 < 200 true, 250 < 200 false
        },
        message: 'Discount price ({VALUE}) should be below regular price', // {VALUE} from function (val)
      }, // same as difficulty: enum:
    }, // custom validator
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true, // this is a remove from start and end empty space like a "   This is a trim   " to "This is a trim"
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: run before .save() and .create() !!! really important not .update() // .insertMany
tourSchema.pre('save', function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// これは exports.getAllTours だけで有効なので、exports.getTour 分も有効にさせる方法2
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // $ne is not equal // this can exclusive {secretTour: true} result from "Get All Tours" // これは全てのリストから {secretTour: true} があれば除外する、管理者などで有効

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); // $ne is not equal

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
