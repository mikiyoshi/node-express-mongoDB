const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('process.nextTick'));

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');

  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'Password encrypted');
  // });

  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'Password encrypted');
  // });

  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'Password encrypted');
  // });

  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'Password encrypted');
  // });
});

console.log('Hello from the top-level code');

// result in Terminal
// 順番が重要
// Hello from the top-level code // console.log('Hello from the top-level code');
// Timer 1 finished // setTimeout(() => console.log('Timer 1 finished'), 0);
// Immediate 1 finished // setImmediate(() => console.log('Immediate 1 finished'));
// I/O finished // console.log('I/O finished');
// ---------------- // console.log('----------------');
// 1022 Password encrypted // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
// 2025 Password encrypted // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
// 3023 Password encrypted // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
// 4022 Password encrypted // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512'); console.log(Date.now() - start, 'Password encrypted');
// process.nextTick // process.nextTick(() => console.log('process.nextTick'));　ここ重要
// Immediate 2 finished // setImmediate(() => console.log('Immediate 2 finished'));　ここ重要
// Timer 2 finished // setTimeout(() => console.log('Timer 2 finished'), 0);　ここ重要
// 1045 Password encrypted // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {console.log(Date.now() - start, 'Password encrypted');});
// Timer 3 finished // setTimeout(() => console.log('Timer 3 finished'), 3000);
