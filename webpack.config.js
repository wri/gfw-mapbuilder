const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const development = require('./webpack.development');
const production = require('./webpack.production');
const deploy = require('./webpack.deploy');

const version = require('./package.json').version;

const directoryName = 'webpackBuild';
const s3Bucket = `wri-sites/gfw-mapbuilder.org/my.gfw-mapbuilder.org/test-deploy/v${version}`;

module.exports = (env) => {
  console.log('Environment:', env);
  console.log('Destination: ', `${__dirname}/${directoryName}`);

  // Webpack entry and output paths
  const PATHS = {
    src: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, directoryName),
    index: __dirname,
    assets: './'
  };

  // Default to development webpack unless production is specified
  if (env === 'production') {
    return merge(common(PATHS), production(PATHS), deploy(directoryName, s3Bucket));
  } else {
    return merge(common(PATHS), development(PATHS));
  }
};
