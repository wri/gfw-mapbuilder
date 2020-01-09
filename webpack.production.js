//@ts-ignore

const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      title: 'ArcGIS Template Application',
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/favicon.ico',
      chunksSortMode: 'none',
      inlineSource: '.(css)$'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css'
    }),

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '/src'),
      path.resolve(__dirname, 'node_modules/')
    ],
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
  },
  node: {
    process: false,
    global: false,
    fs: 'empty'
  }
});
