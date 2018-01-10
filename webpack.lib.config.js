const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const packageJSON = require('./package.json');
const version = packageJSON.version;

module.exports = {
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
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'vendors'),
          path.resolve(__dirname, 'build'),
          path.resolve(__dirname, 'src/js/library.js'),
          path.resolve(__dirname, 'src/js/resources.js')
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
              outputPath: `${version}/css/`
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
              outputPath: `${version}/css/images/`
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
            outputPath: `${version}/css/fonts/`
          }
        }
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin({
      META_VERSION: JSON.stringify(version),
      APP_CSS: `${version}/css/app.css`,
      CRITICAL_CSS: `${version}/css/critical.css`,
      REPORT_CSS: `${version}/css/report.css`,
      APP_JS: 'js/main',
      REPORT_JS: `${version}/js/report`,
      DEFAULT_TITLE: 'GFW Mapbuilder',
      ESRI_VERSION: '3.20'
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.pug'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/report.pug'),
      filename: 'report.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/external.pug'),
      filename: 'external.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/resources.js'),
        to: path.resolve(__dirname, 'libBuild')
      },
      {
        from: path.resolve(__dirname, 'src/js/library.js'),
        to: path.resolve(__dirname, `libBuild/${version}.js`),
        toType: 'file'
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
