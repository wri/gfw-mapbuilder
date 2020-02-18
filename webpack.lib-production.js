//@ts-ignore

const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ArcGISPlugin = require('@arcgis/webpack-plugin');

// require = require("esm")(module/*, options*/)

const cammm = require('./configs/cameroon.js');
console.log('cammm', cammm);

// const PrintContent = require('./configs/modal.config');
// const { printContent } = require('configs/modal.config');
//require('./configs/cameroon.js')
// import '../../configs/dojoConfig';
// import './configs/cameroon';
// import resources from './configs/resources';
// import resources from './configs/cameroon';
// import resolve from './configs/cameroon';
// import { printContent } from './configs/modal.config';
// console.log('printContent');
// console.log(printContent);
// console.log(resources)

module.exports = env => {
  console.log('env', env);
  console.log('env.COUNTRY_CONFIG', env.COUNTRY_CONFIG);

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    // entry: './src/js/lib.tsx',
    // // entry: {
    // //   index: [
    // //     './src/css/index.scss',
    // //     '@dojo/framework/shim/Promise',
    // //     './src/js/lib.tsx'
    // //     // './src/js/libraryMain.ts'
    // //   ]
    // // },
    entry: {
      // index: ['./src/js/lib.tsx', './configs/camJSON.json']
      index: ['./src/js/lib.tsx']
    },
    // entry: () => new Promise((resolve) => resolve([ './src/js/lib.tsx', './configs/cameroon.js'])),
    // entry: {
    //   index: './src/js/lib.tsx',
    //   countryConfig: './configs/cameroon.js',
    // },

    output: {
      // filename: {
      //   index: 'library-bundle.js',
      //   countryConfig: './configs/cameroon.js',
      // },
      filename: 'library-bundle.js',
      // filename: '[name].[chunkhash].js',
      // library: 'MapBuilda'
      publicPath: ''
      // filename: 'libraryMain.js',
      // library: 'MapBuilder',
      // libraryTarget: 'amd',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {}
        },
        // {
        //   test: /\.html$/,
        //   use: [
        //     {
        //       loader: 'html-loader',
        //       options: { minimize: false }
        //     }
        //   ],
        //   exclude: /node_modules/
        // },
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
          console.log('');
          // console.log(compilation.options)
          console.log(compilation.options.entry.index[1]);
          console.log('');
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options
            },
            // 'foo': '{bar: "fooBar"}'
            // 'foo': require('./configs/modal.config')
            // 'foo': require('./configs/modal.config.ts')
            // 'foo': path.resolve(__dirname, './configs/modal.config.ts')
            // foo: compilation.options.entry.index[1]
            // foo: JSON.stringify(require('./configs/camJSON.json'))
            foo: JSON.stringify(cammm)
            // 'foo': './configs/cameroon.js'
            // 'foo': require('./configs/resources.js')
            // 'foo': resources
            // 'foo': require('./configs/cameroon.js')
            // externals: {
            //   'Configurator': JSON.stringify(require('./config/config-dev.json'))
            // },
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
      global: false,
      fs: 'empty'
    }
  };
};
