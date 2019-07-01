const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');
const development = require('./webpack.development');

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

  // We only use webpack development via this config
  return merge(common(PATHS), development(PATHS));

};
