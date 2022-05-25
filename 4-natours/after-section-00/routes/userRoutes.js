const express = require('express');
const router = express.Router(); // replace from userRouter to router

const userController = require('./../controllers/userController');
// OR each import
// const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require('./../controllers/userController');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// OR each import
// router.route('/').get(getAllUsers).post(createUser);
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router; // replace from userRouter to router
