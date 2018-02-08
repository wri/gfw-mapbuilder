const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const development = require('./webpack.development');
const production = require('./webpack.production');

module.exports = (env) => {
  console.log('Environment:', env);
  console.log('Destination: ', `${__dirname}/webpackBuild`);

  // Webpack entry and output paths
  const PATHS = {
    src: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'webpackBuild'),
    index: __dirname,
    assets: './'
  };

  // Default to development webpack unless production is specified
  if (env === 'production') {
    return merge(common(PATHS), production(PATHS));
  } else {
    return merge(common(PATHS), development(PATHS));
  }
};
