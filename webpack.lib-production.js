//@ts-ignore
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./package.json');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  //Generate a public path that is pointing at WRI server appropriate folder corresponding to the folder name that reflects the version, this is done so various esri files
  //like font files and others are loaded correctly due to dynamic pathing issues
  const base = 'https://wri-sites.s3.amazonaws.com/gfw-mapbuilder.org/library.gfw-mapbuilder.org/';
  const publicPathURL = `${base}${PACKAGE.version}/`;

  return {
    mode: 'production',
    devtool: 'source-map',
    entry: {
      'library-bundle': ['./src/js/lib.tsx'],
      [`loader/${PACKAGE.version}`]: [`./src/lib/libLoader.js`],
    },
    output: {
      filename: '[name].js',
      publicPath: publicPathURL,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {},
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
          loader: 'file-loader',
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
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 100,
      }),
      new Dotenv({
        path: path.resolve(__dirname, './.env'),
        systemvars: true,
      }),
      new HtmlWebPackPlugin({
        title: 'ArcGIS Template Application',
        template: './src/library.html',
        filename: './index.html',
        favicon: './src/assets/favicon.ico',
        chunksSortMode: 'none',
        inlineSource: '.(css)$',
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[id].css',
      }),
    ],
    resolve: {
      alias: {
        js: path.join(__dirname, 'src/js'),
        css: path.join(__dirname, 'src/css'),
        images: path.join(__dirname, 'src/images'),
      },
      modules: [
        path.resolve(__dirname, '/src'),
        path.resolve(__dirname, '/configs'),
        path.resolve(__dirname, 'node_modules/'),
      ],
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
      fallback: {
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      },
    },
  };
};
