//@ts-ignore

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
    contentBase: './dist',
    stats: 'minimal',
    open: false,
  },
});
