//@ts-ignore

const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const ArcGISPlugin = require('@arcgis/webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: [
      './src/css/index.scss',
      '@dojo/framework/shim/Promise',
      './src/js/lib.tsx'
      // './src/js/libraryMain.ts'
    ]
  },
  output: {
    // filename: '[name].[chunkhash].js',
    filename: 'library-bundle.js',
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
  //   optimization: {
  //     minimizer: [
  //       new TerserPlugin({
  //         cache: true,
  //         parallel: true,
  //         sourceMap: false,
  //         terserOptions: {
  //           output: {
  //             comments: false
  //           }
  //         }
  //       })
  //     ]
  //   },
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
      inlineSource: '.(css)$'
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
