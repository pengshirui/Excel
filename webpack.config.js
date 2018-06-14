const debug = process.env.NODE_ENV !== "production";
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './src')
const SRCROOT_DIR = path.resolve(__dirname, './src/root')
const DIST_DIR = path.resolve(__dirname, './dist')

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-source-map" : null,
  cache: true,
  entry: SRCROOT_DIR + "/index.jsx",
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'env', 'stage-0']
      }
    }]
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: DIST_DIR,
    filename: "app.min.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: SRCROOT_DIR + '/index.html' , to: DIST_DIR },
      { from: SRC_DIR + '/main.js' , to: DIST_DIR },
      { from: __dirname + '/package.json' , to: DIST_DIR },
    ]),
  ],
};