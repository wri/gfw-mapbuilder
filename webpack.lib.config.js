const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.lib.common');
const development = require('./webpack.development');
const production = require('./webpack.production');
const deploy = require('./webpack.deploy');

const version = require('./package.json').version;

const directoryName = 'libBuild';
const s3Bucket = 'wri-sites/gfw-mapbuilder.org/library.gfw-mapbuilder.org/test-deploy';

module.exports = (env) => {
  console.log('Environment:', env);
  console.log('Destination: ', `${__dirname}/${directoryName}`);

  // Webpack entry and output paths
  const PATHS = {
    src: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, directoryName),
    index: __dirname,
    assets: version
  };

  // Default to development webpack unless production is specified
  if (env === 'production') {
    return merge(common(PATHS), production(PATHS), deploy(directoryName, s3Bucket));
  } else {
    return merge(common(PATHS), development(PATHS));
  }
};
