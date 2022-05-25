const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit(); // When import from Terminal, after that exit.  Otherwise we needs to exit each time
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit(); // When import from Terminal, after that exit.  Otherwise we needs to exit each time
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// test Terminal command
// (base) mikiyoshikokura@Mikiyoshis-MBP 4-natours % node dev-data/data/import-dev-data.js --import
// result in Terminal
// DB connection successful!
// Data successfully loaded!
// (base) mikiyoshikokura@Mikiyoshis-MBP 4-natours % node dev-data/data/import-dev-data.js --delete
// result in Terminal
// DB connection successful!
// Data successfully deleted!

// console.log(process.argv);
// test Terminal command
// (base) mikiyoshikokura@Mikiyoshis-MBP 4-natours % node dev-data/data/import-dev-data.js
// result in Terminal
// [
//   '/Users/mikiyoshikokura/.nvm/versions/node/v15.14.0/bin/node',
//   '/Users/mikiyoshikokura/Desktop/Sites/light-house-lab/virtualbox/w15/node-express-mongoDB/4-natours/dev-data/data/import-dev-data.js'
// ]
