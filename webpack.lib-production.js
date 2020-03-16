//@ts-ignore

const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ArcGISPlugin = require('@arcgis/webpack-plugin');

const cameroonConfig = require('./configs/cameroon.js');

module.exports = env => {
  console.log(env);
  let customConfig = {};

  if (env && env.COUNTRY_CONFIG) {
    customConfig = cameroonConfig; //TODO: Let's make this dynamic!
  }

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      index: ['./src/js/lib.tsx']
    },
    output: {
      filename: 'library-bundle.js',
      publicPath: ''
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {}
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ['url-loader']
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader']
        }
      ]
    },
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

      new ArcGISPlugin({
        useDefaultAssetLoaders: false,
        features: {
          '3d': false
        }
      }),

      new HtmlWebPackPlugin({
        title: 'ArcGIS Template Application',
        template: './src/library.html',
        filename: './library.html',
        favicon: './src/assets/favicon.ico',
        chunksSortMode: 'none',
        inlineSource: '.(css)$',
        templateParameters: (compilation, assets, assetTags, options) => {
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options
            },
            libConfig: JSON.stringify(customConfig)
          };
        }
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
      alias: {
        js: path.join(__dirname, 'src/js'),
        css: path.join(__dirname, 'src/css'),
        images: path.join(__dirname, 'src/images')
      },
      modules: [
        path.resolve(__dirname, '/src'),
        path.resolve(__dirname, '/configs'),
        path.resolve(__dirname, 'node_modules/')
      ],
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
    },
    node: {
      process: false,
      Buffer: false,
      global: false,
      fs: 'empty'
    }
  };
};
