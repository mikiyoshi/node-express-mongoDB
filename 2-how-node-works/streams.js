const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  // result in Terminal
  // Listening... // open browser http://127.0.0.1:8000/ page
  // Node.js is the best!
  // Node.js is the best!
  // Node.js is the best!

  // Solution 2: Streams
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });
  // Listening... // open browser http://127.0.0.1:8000/ page
  // Node.js is the best!
  // Node.js is the best!
  // Node.js is the best!

  // Solution 3
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writeableDest);
  // Listening... // open browser http://127.0.0.1:8000/ page
  // Node.js is the best!
  // Node.js is the best!
  // Node.js is the best!
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
