//@ts-ignore
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: 'production',
    entry: {
      main: ['./src/js/static.tsx'],
    },
    /////
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
        maxChunks: 20,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          REACT_APP_PLANET_API_KEY: JSON.stringify(process.env.REACT_APP_PLANET_API_KEY),
          REACT_APP_GFW_DATA_API_KEY: JSON.stringify(process.env.REACT_APP_GFW_DATA_API_KEY),
        },
      }),

      new CopyWebpackPlugin({
        patterns: [
          { from: './configs/resources.js', to: 'configuration.js' }, //TODO: this needs to be somehow dynamic
        ],
      }),

      new HtmlWebPackPlugin({
        title: 'ArcGIS Template Application',
        template: './src/static.html',
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
