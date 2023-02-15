const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((acc, next) => {
  acc[`process.env.${next}`] = JSON.stringify(env[next]);
  return acc;
}, {})

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
      port: 3000,
      historyApiFallback: true,
      // proxy: {
      //     "/api": {
      //         target: "https://your-api-url",
      //         changeOrigin: true,
      //     },
      // },
  },
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
  ],
}

module.exports = merge(commonConfig, devConfig)