// https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fsreadfilepath-options-callback
const fs = require('fs');
const http = require('http');
// const path = require('path');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

// Synchronous = Blocking
// If made SNS, one user update large file Data in Single thread, other user can't login in Single thread
// read input.txt file
// run terminal / node index.js
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// // write textIn at output.txt file
// // run terminal / node index.js
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Asynchronous = Non-Blocking = Non-Blocking I/O model
// If made SNS, one user update large file Data in Background, other user can login in Single thread
// fs.readFile('./txt/starwwwt.txt', 'utf-8', (err, data1) => {
//   console.log(data1);
//   if (err) return console.log('ERROR!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written');
//       });
//     });
//   });
// });
// console.log('Will read file');

// Node test
// run terminal / node index.js
// const hello = 'Hello';
// console.log(hello);

/////////////////////////////
// Server

// ${__dirname} is domain location

// move to modules/replaceTemplate.js
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);
//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//   return output;
// };

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// Routing-1
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// console.log(slugify('Fresh Avocados', { lower: true }));
// result in Terminal
// fresh-avocados

const server = http.createServer((req, res) => {
  // console.log(req);
  // この結果は header などたくさんの情報が Terminal に表示される
  // _connectionKey: '4:127.0.0.1:8000',

  //   pathname: '/product',  >> replace from pathName to pathname
  const { query, pathname } = url.parse(req.url, true);
  // result in Terminal
  // [Object: null prototype] { id: '0' }

  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  // result in Terminal
  // /product?id=0
  // Url {
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: '?id=0',
  //   query: [Object: null prototype] { id: '0' },
  //   pathname: '/product',  >> replace from pathName to pathname
  //   path: '/product?id=0',
  //   href: '/product?id=0'
  // }

  // http://127.0.0.1:8000/hello
  // この結果は browser で URL を入力すると Terminal に表示される、
  // (base) mikiyoshikokura@Mikiyoshis-MBP 1-node-farm % node index.js
  // Listen to requests on port 8000
  // /test
  // /hello?id=2%abc=465

  //   pathname: '/product',  >> replace from pathName to pathname
  // const pathName = req.url;

  // Overview page
  //   pathname: '/product',  >> replace from pathName to pathname
  if (pathname === '/' || pathname === '/overview') {
    // http://127.0.0.1:8000/overview
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    // console.log(cardHtml);
    // res.end(tempOverview);
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output);
    // res.end('This is the Overview');

    // Product page
  } else if (pathname === '/product') {
    // http://127.0.0.1:8000/product
    // console.log(query);
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // res.end('This is the Product');

    // API page
  } else if (pathname === '/api') {
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, { 'Content-type': 'application/json' });
    //   res.end(data);
    // }); // Routing-1
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // res.end('API');

    // Not Found page
  } else {
    // http://127.0.0.1:8000/abc
    res.writeHead(404, {
      'Content-type': 'text/html', // developer tool の Network Response Headers に Content-type text/html
      'my-own-header': 'hello-world', // developer tool の Network Response Headers に my-own-header hello-world
    });
    // developer tool の Network に 404 Not Found が表示される
    // res.end('Page not found'); // 黒画面に文字だけ表示される
    res.end('<h1>Page not found</h1>'); // HTML page に表示される
  }
  // res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listen to requests on port 8000');
});
