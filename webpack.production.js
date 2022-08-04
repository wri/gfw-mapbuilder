//@ts-ignore
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const fs = require('fs');
const Dotenv = require('dotenv-webpack');
// const dotenv = require('dotenv');

// const currentPath = path.join(__dirname);
// const basePath = currentPath + '/.env';
// // We're concatenating the environment name to our filename to specify the correct env file!
// const envPath = basePath + '.' + process.env.REACT_APP_PLANET_API_KEY;
// // Check if the file exists, otherwise fall back to the production .env
// const finalPath = fs.existsSync(envPath) ? envPath : basePath;
// // Set the path parameter in the dotenv config
// const fileEnv = dotenv.config({ path: finalPath }).parsed;
// // reduce it to a nice object, the same as before
// const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
//   return prev;
// }, {});

module.exports = (env) => {
  console.log('from webpack.produciton', env);
  console.log('from webpack.produciton env |||', process.env.REACT_APP_PLANET_API_KEY);

  return {
    mode: 'production',
    entry: {
      main: ['./src/js/static.tsx'],
    },
    output: {
      filename: '[name].js',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
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
          loader: ['file-loader'],
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
        },
      }),

      new CopyWebpackPlugin([
        { from: './configs/resources.js', to: 'configuration.js' }, //TODO: this needs to be somehow dynamic
      ]),
      new Dotenv({
        systemvars: true,
      }),
      // new Dotenv(),
      // new webpack.DefinePlugin(envKeys),
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

      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|html|css)$/,
        threshold: 10240,
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
    },
  };
};
