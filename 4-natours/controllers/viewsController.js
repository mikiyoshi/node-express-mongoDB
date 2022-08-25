const Tour = require('../models/tourModel');
const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful!  Please check your email for a confirmation.  If your booking doesn't show up here immediately, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours // tours: tours before ES6
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template

  // 3) Render that template using tour data from 1)

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account!'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const tours = await Tour.find().populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  res.status(200).render('overview', {
    title: 'My Reviews',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  // console.log('UPDATING USER', req.body);
  // update /me, UPDATING USER { name: 'Lourdes Fun Browning', email: 'loulou.s@example.com' }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true, // update document result
      runValidators: true // API validation
    }
  );

  // submit after return /me page with updated result
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});

exports.updateReviewData = catchAsync(async (req, res, next) => {
  console.log('UPDATING REVIEW', req.body);
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  console.log('UPDATE REVIEW', tour);

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
  // UPDATING REVIEW {
  //   review: 'Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt',
  //   rating: '1'
  // }

  // const review = await Review.findByIdAndUpdate(
  //   req.review._id,
  //   {
  //     review: req.body.review,
  //     rating: req.body.rating
  //   },
  //   {
  //     new: true, // update document result
  //     runValidators: true // API validation
  //   }
  // );

  // // // submit after return /me page with updated result
  // res.status(200).render('overview', {
  //   title: 'My Tours',
  //   user: review
  // });
});
