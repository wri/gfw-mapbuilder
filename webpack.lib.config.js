const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.lib.common');
const production = require('./webpack.production');

const version = require('./package.json').version;

module.exports = (env) => {
  console.log('Environment:', env);
  console.log('Destination: ', `${__dirname}/libBuild`);

  // Webpack entry and output paths
  const PATHS = {
    src: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'libBuild'),
    index: __dirname,
    assets: version
  };

  // We only use webpack production via this config
  return merge(common(PATHS), production(PATHS));

};
