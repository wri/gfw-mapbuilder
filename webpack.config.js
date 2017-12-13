const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const packageJSON = require('./package.json');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/js/main.js'),
    report: path.join(__dirname, 'src/js/reportMain.js')
    // lib: path.join(__dirname, 'src/js/libraryMain.js')
  },
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
      pickadate$: path.join(__dirname, 'vendors/pickadate/lib/picker.date.js')
      // FileSaver: path.join(__dirname, 'vendors/file-saver.js/FileSaver.js'),
      // jquery: path.join(__dirname, 'vendors/jquery/dist/jquery.min.js'),
      // picker: path.join(__dirname, 'vendors/pickadate/lib/compressed/picker'),
      // rangeSlider: path.join(__dirname, 'vendors/ion.rangeslider/js/ion.rangeSlider.js'),
      // ionCSS: path.join(__dirname, 'vendors/ion.rangeslider/css/ion.rangeSlider.css'),
      // ionSkinCSS: path.join(__dirname, 'vendors/ion.rangeslider/css/ion.rangeSlider.skinNice.css')
    }
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
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
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin({
      META_VERSION: JSON.stringify(packageJSON.version),
      APP_CSS: 'css/app.css',
      // CRITICAL_CSS: 'css/critical.css',
      APP_JS: 'js/app',
      REPORT_JS: 'js/report',
      DEFAULT_TITLE: 'GFW Mapbuilder',
      ESRI_VERSION: '3.22'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.pug'),
      inject: false
    }),
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
