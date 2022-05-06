import fs from 'node:fs';
import https from 'node:https';

const url =
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300';

https
  .get(url, (res) => {
    const imagePath = './memes1/01.jpg';
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
/* fs.writeFile(
  './memes',
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300',
  () => {
    console.log('Download Complete');
  },
);*/
