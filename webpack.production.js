const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');

// TODO: uglifyjs-webpack-plugin, compression-webpack-plugin

// Webpack configuration for production
module.exports = (PATHS) => {
  return merge([
    parts.loadStyl({
      include: PATHS.src,
      options: {
        name: '[name].css',
        outputPath: `${PATHS.assets}/css/`
      }
    }),

    // Load Images
    parts.loadImages({
      include: PATHS.app,
      options: {
        limit: 15000,
        name: '[name].[ext]',
      },
    }),

    // Source Maps
    parts.generateSourceMaps({ type: 'source-map' }),

    // Clean build
    parts.clean(PATHS.build),

    // Uglify JavaScript
    parts.uglifyJavaScript(),

    {
      plugins: [
        new webpack.DefinePlugin(
          { 'process.env': {
            'NODE_ENV': '"production"',
          },
          }
        ),
        new webpack.HashedModuleIdsPlugin(),
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|html|css)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new S3Plugin({
          directory: 'libBuild',
          s3Options: {
            accessKeyId: process.env.WRI_SITES_AWS_KEY,
            secretAccessKey: process.env.WRI_SITES_AWS_SECRET,
            region: 'us-east-1'
          },
          s3UploadOptions: {
            Bucket: 'wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org'
          },
        }),
      ],
    },
  ]);
};
