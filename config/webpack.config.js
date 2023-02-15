const devConfig = require('./webpack.dev')
const productionConfig = require('./webpack.prod')

const mode = process.env.NODE_ENV

// if (mode === 'development') {
//   module.exports = devConfig;
// } else if (mode === 'production') {
//   module.exports = productionConfig
// }