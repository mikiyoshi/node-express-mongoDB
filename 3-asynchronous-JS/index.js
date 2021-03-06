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
      if (err) reject('Could not write file π’');
      resolve('success');
    });
  });
};

// Async / Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // console.log(res.body.message);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log('All: ', all);
    const imgs = all.map((el) => el.body.message);
    console.log('Images: ', imgs);

    // await writeFilePro('dog-img.txt', res.body.message);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: READY πΆ';
};

// ////////////////////Promise ζΈγζγ start
(async () => {
  try {
    console.log('1: Will get dog pics');

    const x = await getDogPic();
    console.log(x);

    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR π₯');
  }
})();
// ////////////////////Promise ζΈγζγ end

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
// Promise { <pending> }γ// return '2: READY πΆ'; γγγθ‘¨η€Ίγγγͺγ
// 3: Done getting dog pics
// Breed: retriever
// https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_2573.jpg
// Random dog image saved to file!

//
/*
// ////////////////////Promise ζΈγζγ start
console.log('1: Will get dog pics');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => {
    console.log('ERROR π₯');
    // throw err;52θ‘η?γγγγ?throw err;γ¨γγγγͺγγ¨γγγ‘γ€γ«εγ¨γ©γΌγ§γδΈθ¨γθ‘¨η€Ίγγγ
    // result in Terminal
    // 1: Will get dog pics
    // I could not find that file
    // 2: READY πΆ
    // 3: Done getting dog pics
  });
  // ////////////////////Promise ζΈγζγ end
*/
//

// result in Terminal
// 1: Will get dog pics
// Breed: retriever
// https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_1837.jpg
// Random dog image saved to file!
// 2: READY πΆ
// 3: Done getting dog pics

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    // readFilePro(`${__dirname}/dog.txt`.then( γ«η§»εγfs.readFile( γγη§»ε
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // https://dog.ceo/dog-api/documentation/breed
  })
  .then((res) => {
    // .then((res) => { γ«η§»εγend((err, res) => { γγη§»ε
    // if (err) return console.log('dog.txt Error Breed name: ', err.message); // γγγ― .catch((err) => { γ«η§»ε
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
// readFilePro(`${__dirname}/dog.txt`.then( γ«η§»εγfs.readFile( γγη§»ε
// console.log(`Breed: ${data}`);
// superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`) // https://dog.ceo/dog-api/documentation/breed
//   .then((res) => {
//     // .then((res) => { γ«η§»εγend((err, res) => { γγη§»ε
//     // if (err) return console.log('dog.txt Error Breed name: ', err.message); // γγγ― .catch((err) => { γ«η§»ε
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
// .then((res) => { γ«η§»εγend((err, res) => { γγη§»ε
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
//       if (err) reject('I could not find that file π’');
//       resolve(data);
//     });
//   });
// };

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject('Could not write file π’');
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
//     console.log('ERROR π₯');
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
    console.log('ERROR π₯');
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
