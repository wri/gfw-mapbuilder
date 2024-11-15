//@ts-ignore
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/css/index.scss', './src/js/index.tsx'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        include: /node_modules\/(@arcgis|@esri\/calcite-components|@zip.js)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
              compact: true,
              sourceType: 'unambiguous',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebPackPlugin({
      title: 'ArcGIS Template Application',
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/favicon.ico',
      chunksSortMode: 'none',
      inlineSource: '.(css)$',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
  ],
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
    modules: [path.resolve(__dirname, '/src'), path.resolve(__dirname, 'node_modules/')],
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
  },
};
