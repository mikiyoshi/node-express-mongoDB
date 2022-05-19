const dotenv = require('dotenv');
const app = require('./app'); // Expected 1 empty line after require statement not followed by another require.

dotenv.config({ path: './config.env' });

// make a file in config.env and result in Terminal
// NODE_ENV: 'development',
// PORT: '8000',
// USERNAME: 'jonas',
// PASSWORD: '123456'

// console.log(app.get('env')); // result in Terminal // development
// console.log(process.env); // result in Terminal // { bunch of stuff obj data }
// test in Terminal
// type
// (base) mikiyoshikokura@Mikiyoshis-MBP 4-natours % NODE_ENV=development x=23 npx nodemon server.js
// result in Terminal
// NODE_ENV: 'development',
// x: '23',

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
