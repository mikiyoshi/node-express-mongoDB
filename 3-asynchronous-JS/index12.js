const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

// Async / Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    console.log(res.body.message);

    // const res1Pro = superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // const res2Pro = superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // const res3Pro = superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );
    // const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    // const imgs = all.map((el) => el.body.message);
    // console.log(imgs);

    await writeFilePro('dog-img.txt', res.body.message);
    // await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: READY 🐶';
};

// ////////////////////Promise 書き換え start
(async () => {
  try {
    console.log('1: Will get dog pics');

    const x = await getDogPic();
    console.log(x);

    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();
// ////////////////////Promise 書き換え end

//
// getDogPic();
// console.log('2: Done getting dog pics');
// result in Terminal
// 1: Will get dog pics
// 2: Done getting dog pics
// Breed: retriever
// https://images.dog.ceo/breeds/retriever-golden/n02099601_3262.jpg
// Random dog image saved to file!
//
// const x = getDogPic();
// console.log(x);
// console.log('3: Done getting dog pics');
// result in Terminal
// 1: Will get dog pics
// Promise { <pending> }　// return '2: READY 🐶'; これが表示されない
// 3: Done getting dog pics
// Breed: retriever
// https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_2573.jpg
// Random dog image saved to file!

//
/*
// ////////////////////Promise 書き換え start
console.log('1: Will get dog pics');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => {
    console.log('ERROR 💥');
    // throw err;52行目あたりのthrow err;とこれがないと、ファイル名エラーでも下記が表示される
    // result in Terminal
    // 1: Will get dog pics
    // I could not find that file
    // 2: READY 🐶
    // 3: Done getting dog pics
  });
  // ////////////////////Promise 書き換え end
*/
//

// result in Terminal
// 1: Will get dog pics
// Breed: retriever
// https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_1837.jpg
// Random dog image saved to file!
// 2: READY 🐶
// 3: Done getting dog pics

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    // readFilePro(`${__dirname}/dog.txt`.then( に移動、fs.readFile( から移動
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // https://dog.ceo/dog-api/documentation/breed
  })
  .then((res) => {
    // .then((res) => { に移動、end((err, res) => { から移動
    // if (err) return console.log('dog.txt Error Breed name: ', err.message); // ここは .catch((err) => { に移動
    console.log(res.body.message);

    return writeFilePro('dog-img.txt', res.body.message);
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   if (err) return console.log('image file error', err.message);
    //   console.log('Random dog image saved to file!');
    // });
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    console.log('dog.txt Error Breed name: ', err.message);
  });
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// readFilePro(`${__dirname}/dog.txt`.then( に移動、fs.readFile( から移動
// console.log(`Breed: ${data}`);
// superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`) // https://dog.ceo/dog-api/documentation/breed
//   .then((res) => {
//     // .then((res) => { に移動、end((err, res) => { から移動
//     // if (err) return console.log('dog.txt Error Breed name: ', err.message); // ここは .catch((err) => { に移動
//     console.log(res.body.message);
//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       if (err) return console.log('image file error', err.message);
//       console.log('Random dog image saved to file!');
//     });
//   })
//   .catch((err) => {
//     console.log('dog.txt Error Breed name: ', err.message);
//   });
//
// .end((err, res) => {
// console.log(res.body);
// result in Terminal
// Breed: retriever
// {
// message: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_3869.jpg', // when u get this .jpg URL console.log(res.body.message);
// status: 'success'
// }
//
// .then((res) => { に移動、end((err, res) => { から移動
// if (err) return console.log('dog.txt Error Breed name: ', err.message);
// console.log(res.body.message);
// fs.writeFile('dog-img.txt', res.body.message, (err) => {
//   if (err) return console.log('image file error: ', err.message);
//   console.log('Random dog image saved to file!');
// });
// });
// });

// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject('I could not find that file 😢');
//       resolve(data);
//     });
//   });
// };

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject('Could not write file 😢');
//       resolve('success');
//     });
//   });
// };

// (async () => {
//   try {
//     console.log('1: Will get dog pics!');
//     const x = await getDogPic();
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   } catch (err) {
//     console.log('ERROR 💥');
//   }
// })();

/*
console.log('1: Will get dog pics!');
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3: Done getting dog pics!');
  })
  .catch(err => {
    console.log('ERROR 💥');
  });
*/
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err);
  });
*/
