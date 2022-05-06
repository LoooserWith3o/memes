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

let n;
const urls = [];
const str = data;
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((n = rex.exec(str))) {
  urls.push(n[1]);
}
const img = urls.slice(0, 10);

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
    })
    .on('error', (err) => {
      // handle error
      console.log(err);
    });
}
