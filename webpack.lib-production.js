//@ts-ignore
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./package.json');
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
  //Generate a public path that is pointing at WRI server appropriate folder corresponding to the folder name that reflects the version, this is done so various esri files
  console.log('from webpack.lib', env);
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
          loader: ['file-loader'],
        },
      ],
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
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 100,
      }),
      // new Dotenv(),
      // new webpack.DefinePlugin(envKeys),
      new Dotenv({
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
