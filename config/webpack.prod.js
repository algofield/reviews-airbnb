const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((acc, next) => {
  acc[`process.env.${next}`] = JSON.stringify(env[next]);
  return acc;
}, {})

const productionConfig = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src', 'client', 'templates', 'index.ejs'),
      filename: 'index.html',
      favicon: path.join(__dirname, '../src', 'client', 'images', 'favicon', 'favicon.ico'),
      inject: 'body',
      // minify: true,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
}

module.exports = merge(commonConfig, productionConfig)