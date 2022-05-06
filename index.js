import fs from 'node:fs';
import https from 'node:https';
import fetch from 'node-fetch';

// makes directory
fs.mkdir('./memes', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const data = await response.text();

// Link for a single meme
/* const url =
 'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300';
console.log(url);
const url1 = 'https://api.memegen.link/images/keanu.jpg?width=300';
console.log(url1); */

let n;
const urls = [];
const str = data;
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((n = rex.exec(str))) {
  urls.push(n[1]);
}
const img = urls.slice(0, 10);
// console.log(img);

/* const response1 = await fetch(
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
);
const response2 = await fetch(
  'https://api.memegen.link/images/xy/all_the_things!!!.jpg?width=300',
);

console.log(response1);
console.log(response2); */

for (let i = 0; i < img.length; i++) {
  const path = `./memes1/0${i}.jpg`;
  https
    .get(img[i], (res) => {
      const imagePath = path;
      const stream = fs.createWriteStream(imagePath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log('Image downloaded');
      });
      /* const err = img.slice(0, 10);
      console.log(err);
      console.log(path);*/
    })
    .on('error', (err) => {
      // handle error
      console.log(err);
      // console.log(path);
    });
}
/* https
    .get(url, (res) => {
      const imagePath = path;
      const stream = fs.createWriteStream(imagePath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log('Image downloaded');
      });
      const err = urls.slice(0, 10);
      console.log(err);
      console.log(path);
    })
    .on('error', (err) => {
      // handle error
      console.log(err);
    });
  https.get(url1, (res) => {
    const imagePath = './memes1/02.jpg';
    const stream = fs.createWriteStream(imagePath);
    res.pipe(stream);
    stream.on('finish', () => {
      stream.close();
      console.log('Image downloaded');
    });
    // const err = urls.slice(0, 10);
    // console.log(err);
  });
  // .on('error', (err) => {
  // handle error
  // console.log(err);
  // });
}
*/
