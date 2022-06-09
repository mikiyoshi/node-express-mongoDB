const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router(); // replace from userRouter to router

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect); // after this setting can remove "authController.protect"
// test at postman "Get Current User"
// setting Authorization "Bearer Token"
// result in postman
// "status": "success",
// setting Authorization "Inherit auth from parent"
// result in postman
// "status": "fail",

router.patch(
  '/updateMyPassword',
  // authController.protect,
  authController.updatePassword
);

router.get(
  '/me',
  // authController.protect,
  userController.getMe,
  userController.getUser
);

router.patch(
  '/updateMe',
  // authController.protect,
  userController.updateMe
);
router.delete(
  '/deleteMe',
  // authController.protect,
  userController.deleteMe
);

router.use(authController.restrictTo('admin'));
// test at postman "Login" as "admin"
// result in postman "Get All Users"
// "status": "success",
// test at postman "Login" as not "admin"
// result in postman "Get All Users"
// "status": "fail",
// "message": "You do not have permission to perform this action",

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router; // replace from userRouter to router
