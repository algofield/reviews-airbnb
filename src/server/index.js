const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const util = require('util');
// const File = require('./tools/file.js');
const MIMETYPES = require('./mimetypes.js');

const dirname = path.resolve();
console.log(dirname);
const port = 8443;

const readFile = util.promisify(fs.readFile);

(async () => {
  const server = http2.createSecureServer({
          'key': fs.readFileSync(path.join(__dirname, './ssl/localhost-privkey.pem')),
          'cert': fs.readFileSync(path.join(__dirname, './ssl/localhost-cert.pem')),
  });

  server.on('error', (error) => console.error(error));

  server.on('stream', async (stream, headers) => {
    stream.respond({
      'content-type': MIMETYPES[path.extname(headers[':path'] === '/' ? 'index.html' : headers[':path'])],
      ':status': 200,
    })
    stream.end(await readFile(`${dirname}/dist/${headers[':path'] === '/' ? 'index.html' : headers[':path']}`, 'utf8'));
  })

  server.listen(port);
  console.log(`Server working on localhost:${port}`);
})();