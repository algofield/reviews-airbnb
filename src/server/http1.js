const express = require('express');
const cors = require('cors');
const path = require('path');

app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(express.static('dist'));

app.listen(port, e => {
  if (e) {
    console.error(e);
  } else {
    let [hours, minutes, seconds] = (new Date()).toString().slice(16, 24).split(':').map(Number);
    let amPm = hours >= 12 ? 'pm' : 'am';
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours += 12;
    }
    const time = `${hours}:${minutes}:{seconds} ${amPm}`;
    console.log(`server launched at ${time} on localhost:${port}`)
  }
});
// const fs = require('fs');
// const http2Express = require('http2-express-bridge')
// const http2 = require('http2')
// const dev = process.env.NODE_ENV !== 'production';
// const options = {
//   key: fs.readFileSync(path.join(__dirname, 'auth', '/privateKey.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'auth', '/certificate.crt')),
//   // allowHTTP1: true
// };
// only change required
// const app = http2Express(express)
// const server = http2.createSecureServer(options, app)
// server.listen(3000)
