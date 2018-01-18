const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const packageJSON = require('./package.json');

// Common webpack configuration for both development and production
module.exports = (PATHS) => {
  return merge([
    {
      // For each entry point, webpack will begin to create it's dependency graph starting at the entries defined
      entry: {
        main: [
          path.resolve(__dirname, 'src/js/main.js'),
          path.resolve(__dirname, 'src/css/app.styl'),
          path.resolve(__dirname, 'src/css/critical.styl')
        ],
        report: [
          path.resolve(__dirname, 'src/js/reportMain.js'),
          path.resolve(__dirname, 'src/css/report.styl')
        ]
        // lib: path.resolve(__dirname, 'src/js/libraryMain.js')
      },
      output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'webpackBuild'),
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
          META_VERSION: JSON.stringify(packageJSON.version),
          APP_CSS: 'css/app.css',
          CRITICAL_CSS: 'css/critical.css',
          REPORT_CSS: 'css/report.css',
          JQUERY: 'jquery/dist/jquery.min.js',
          APP_JS: 'js/main',
          REPORT_JS: 'js/report',
          DEFAULT_TITLE: 'GFW Mapbuilder',
          ESRI_VERSION: '3.20'
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.pug'),
          inject: false
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/report.pug'),
          filename: 'report.html',
          inject: false
        }),
        // new HtmlWebpackPlugin({
        //   template: path.resolve(__dirname, 'src/external.pug'),
        //   inject: false
        // }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'src/resources.js'),
            to: path.resolve(__dirname, 'webpackBuild')
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
