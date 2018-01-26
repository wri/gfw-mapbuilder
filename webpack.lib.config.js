const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.lib.common');
const development = require('./webpack.development');
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

  // Default to development webpack unless production is specified
  if (env === 'production') {
    return merge(common(PATHS), production(PATHS));
  } else {
    return merge(common(PATHS), development(PATHS));
  }
};
