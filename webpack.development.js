//@ts-ignore

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: { pathinfo: false },
  optimization: {
    removeEmptyChunks: false,
    removeAvailableModules: false,
    splitChunks: false,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    devMiddleware: {
      stats: 'minimal',
    },
    open: false,
  },
});
