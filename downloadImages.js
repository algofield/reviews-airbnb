const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const Sharp = require('sharp')

const UNSPLASH_API_KEY = require('./unSplashApiKey.js')

const HOUSES_COLLECTION = [3488741, 'interiors'];
const PEOPLE_COLLECTION = [138794, 'people'];

function fetchPhotos(collectionId, pathName) {
  return Axios({
    url: `https://api.unsplash.com/collections/${collectionId}/photos`,
    params: {
      'page': 1,
      'per_page': '100',
      'client_id': UNSPLASH_API_KEY
    },
    method: 'GET'
  })
    .then(res => res.data.map(item => [`https://unsplash.com/photos/${item.id}/download?force=true`, item.id]))
    .then(data => {
      const names = data.map(item => item[1]);
      const urls = data.map(item => item[0]);
      return Promise.all(urls.map(async function (url, i) {
        let path = Path.resolve(__dirname, 'images', pathName, `${names[i]}.jpeg`)
        let writer = Fs.createWriteStream(path)
        let response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream'
        });
        response.data.pipe(writer)
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        });
      }));
    });
}
function fetchPhotos_NoAPI(collectionId, pathName) {
  return Axios({
    url: `https://unsplash.com/search/photos/portrait`,
    params: {
      'page': 2,
      'per_page': '100'
    },
    method: 'GET'
  })
    .then(res => res.data.map(item => [`https://unsplash.com/photos/${item.id}/download?force=true`, item.id]))
    .then(data => {
      const names = data.map(item => item[1]);
      const urls = data.map(item => item[0]);
      return Promise.all(urls.map(async function (url, i) {
        let path = Path.resolve(__dirname, 'images', pathName, `${names[i]}.jpeg`)
        let writer = Fs.createWriteStream(path)
        let response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream'
        });
        response.data.pipe(writer)
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        });
      }));
    });
}

function resizeImages(fromPath, toPath, height, width) {
  Fs.readdir(Path.join(__dirname, 'images', fromPath), { encoding: 'utf8' }, (error, data) => {
    if (error) console.error(error);
    else {
      data.forEach(img => {
        // console.log(img);
        let inPath = Path.resolve(__dirname, 'images', fromPath, img)
        let outPath = Path.resolve(__dirname, 'images', toPath, `${height}x${width}_${img}`)
        Sharp(inPath).resize({
          width: width,
          height: height,
          fit: Sharp.fit.cover,
          position: Sharp.strategy.entropy
        }).toFile(outPath)
          .catch(console.error);
      });
    }
  });
};

const people2 = [1112424, 'people'];
const rooms = [3759609, 'rooms'];

// fetchPhotos(...PEOPLE_COLLECTION)
// fetchPhotos(...HOUSES_COLLECTION)
// resizeImages(HOUSES_COLLECTION[1])
fetchPhotos(...rooms)
// resizeImages('people', 'small', 225, 225)

