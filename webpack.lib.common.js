

const packageJSON = require('./package.json');
const version = packageJSON.version;

// module.exports = {
//   entry: {
//     report: [
//       path.resolve(__dirname, 'src/js/reportMain.js'),
//       path.resolve(__dirname, 'src/css/report.styl')
//     ],
//     libraryMain: path.resolve(__dirname, 'src/js/libraryMain.js')
//   },
//   output: {
//     filename: `${version}/js/[name].js`,
//     path: path.resolve(__dirname, 'libBuild'),
//     libraryTarget: 'amd'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: [
//           /node_modules/,
//           path.resolve(__dirname, 'vendors'),
//           path.resolve(__dirname, 'build'),
//           path.resolve(__dirname, 'src/js/library.js'),
//           path.resolve(__dirname, 'src/js/resources.js')
//         ],
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['es2015', 'react', 'stage-0'],
//             plugins: ['transform-es2015-modules-amd']
//           }
//         }
//       },
//       {
//         test: /\.styl$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].css',
//               outputPath: `${version}/css/`
//             }
//           },
//           { loader: 'extract-loader' },
//           {
//             loader: 'css-loader'
//           },
//           { loader: 'stylus-loader' }
//         ]
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(svg)$/,
//         use: ['url-loader']
//       },
//       {
//         test: /\.(png|jpg|gif)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               publicPath: '../',
//               outputPath: `${version}/css/images/`
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(woff|woff2|ttf|)$/,
//         use: {
//           loader: 'file-loader',
//           options: {
//             publicPath: '../',
//             outputPath: `${version}/css/fonts/`
//           }
//         }
//       }
//     ]
//   ],
//   externals: [
//     function (context, request, callback) {
//       if (/^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request)) {
//         callback(null, 'amd ' + request);
//       } else {
//         callback();
//       }
//     }
//   ]
// };

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

// Common webpack configuration for both development and production
module.exports = (PATHS) => {
  return merge([
    {
      // For each entry point, webpack will begin to create it's dependency graph starting at the entries defined
      entry: {
        report: [
          path.resolve(__dirname, 'src/js/reportMain.js'),
          path.resolve(__dirname, 'src/css/report.styl')
        ],
        libraryMain: path.resolve(__dirname, 'src/js/libraryMain.js')
      },
      output: {
        filename: `${version}/js/[name].js`,
        path: path.resolve(__dirname, 'libBuild'),
        libraryTarget: 'amd'
      },
      resolve: {
        alias: {
          js: path.resolve(__dirname, 'src/js'),
          css: path.resolve(__dirname, 'src/css'),
          vendors: path.resolve(__dirname, 'vendors'),
          utils: path.resolve(__dirname, 'src/js/utils'),
          components: path.resolve(__dirname, 'src/js/components'),
          stores: path.resolve(__dirname, 'src/js/stores'),
          actions: path.resolve(__dirname, 'src/js/actions'),
          constants: path.resolve(__dirname, 'src/js/constants'),
          helpers: path.resolve(__dirname, 'src/js/helpers'),
          report: path.resolve(__dirname, 'src/js/report'),
          resources: path.resolve(__dirname, 'src/resources'),
          images: path.resolve(__dirname, 'src/css/images')
        }
      },

      externals: [
        // Handles Dojo/ArcGIS JS API requests
        function (context, request, callback) {
          if (/^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request)) {
            callback(null, 'amd ' + request);
          } else {
            callback();
          }
        }
      ],

      plugins: [
        // Enable Progress Feedback
        new webpack.ProgressPlugin(),
        // Simplifies creation of HTML file
        new InterpolateHtmlPlugin({
          META_VERSION: JSON.stringify(version),
          APP_CSS: `${version}/css/app.css`,
          CRITICAL_CSS: `${version}/css/critical.css`,
          REPORT_CSS: `./css/report.css`,
          APP_JS: 'js/main',
          REPORT_JS: `./js/report`,
          DEFAULT_TITLE: 'GFW Mapbuilder',
          ESRI_VERSION: '3.20'
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/external.pug'),
          filename: 'external.html',
          inject: false
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/report.pug'),
          filename: `${version}/report.html`,
          inject: false
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'src/resources.js'),
            to: path.resolve(__dirname, `libBuild/${version}/resources.js`)
          },
          {
            from: path.resolve(__dirname, 'src/js/library.js'),
            to: path.resolve(__dirname, `libBuild/${version}.js`),
            toType: 'file'
          }
        ]),
      ],

      module: {
        rules: [
          {
            test: /\.pug$/,
            use: [
              { loader: 'html-loader' },
              {
                loader: 'pug-html-loader',
                options: {
                  self: true
                }
              }
            ]
          },
        ]
      }
    },
    // Lint JavaScript Module
    parts.lintJavaScript({
      include: PATHS.src,
      options: {
        emitWarning: true
      }
    }),

    // Transpile JavaScript
    parts.loadJavaScript({ include: PATHS.src }),
  ]);
};
