/*
 * @功能描述:
 */
const { merge }  = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');

// const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : proConfig;
  return merge(baseConfig, config);
};
