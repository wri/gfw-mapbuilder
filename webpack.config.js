const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const packageJSON = require('./package.json');

module.exports = {
  // entry: {
  //   main: path.join(__dirname, 'src/js/main.js'),
  //   report: path.join(__dirname, 'src/js/reportMain.js')
    // lib: path.join(__dirname, 'src/js/libraryMain.js')
  // },
  entry: [
    path.join(__dirname, 'src/js/main.js'),
    // path.join(__dirname, 'src/js/reportMain.js'),
    path.join(__dirname, 'src/css/app.styl'),
    path.join(__dirname, 'src/css/critical.styl')
  ],
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'webpackBuild'),
    libraryTarget: 'amd',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  resolve: {
    alias: {
      js: path.join(__dirname, 'src/js'),
      css: path.join(__dirname, 'src/css'),
      vendors: path.join(__dirname, 'vendors'),
      utils: path.join(__dirname, 'src/js/utils'),
      components: path.join(__dirname, 'src/js/components'),
      stores: path.join(__dirname, 'src/js/stores'),
      actions: path.join(__dirname, 'src/js/actions'),
      constants: path.join(__dirname, 'src/js/constants'),
      helpers: path.join(__dirname, 'src/js/helpers'),
      report: path.join(__dirname, 'src/js/report'),
      resources: path.join(__dirname, 'src/resources'),
      images: path.join(__dirname, 'src/css/images')
    }
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name].html'
          //   }
          // },
          // { loader: 'extract-loader' },
          { loader: 'html-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              self: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.join(__dirname, 'vendors'),
          path.join(__dirname, 'build'),
          path.join(__dirname, 'src/js/library.js'),
          path.join(__dirname, 'src/js/resources.js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-es2015-modules-amd']
          }
        }
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'css/'
            }
          },
          { loader: 'extract-loader' },
          {
            loader: 'css-loader'
          },
          { loader: 'stylus-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../',
              outputPath: 'css/images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '../',
            outputPath: 'css/fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin({
      META_VERSION: JSON.stringify(packageJSON.version),
      APP_CSS: 'css/app.css',
      CRITICAL_CSS: 'css/critical.css',
      JQUERY: 'jquery/dist/jquery.min.js',
      APP_JS: 'js/main',
      REPORT_JS: 'js/report',
      DEFAULT_TITLE: 'GFW Mapbuilder',
      ESRI_VERSION: '3.20'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.pug'),
      inject: false
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src/report.pug'),
    //   inject: false
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src/external.pug'),
    //   inject: false
    // }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'vendors'),
        to: path.join(__dirname, 'webpackBuild')
      },
      {
        from: path.join(__dirname, 'src/resources.js'),
        to: path.join(__dirname, 'webpackBuild')
      }
    ])
  ],
  externals: [
    function (context, request, callback) {
      if (/^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request)) {
        callback(null, 'amd ' + request);
      } else {
        callback();
      }
    }
  ]
};
