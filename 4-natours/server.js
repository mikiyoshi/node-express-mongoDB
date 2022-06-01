const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
  // server.close(() => {
  //   process.exit(1);
  // });
});

dotenv.config({ path: './config.env' });
// test at postman "127.0.0.1:3000/api/v1/tours?duration=5&difficulty=easy"
// result in Terminal
// { duration: '5', difficulty: 'easy' }
// GET /api/v1/tours?duration=5&difficulty=easy 200 122.694 ms - 9387  // dotenv.config({ path: './config.env' }); を const app = require('./app') の前にするとここが表示される
const app = require('./app'); // Expected 1 empty line after require statement not followed by another require.

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));
// .catch(err => console.log('ERROR')); // this is a simple error message when update DB error password at config.env

// 4) START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// DB password error
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x); // UNCAUGHT error test
