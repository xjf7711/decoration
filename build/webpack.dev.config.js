// const webpack = require("webpack");

// webpack打包文件体积和依赖关系的可视化
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  plugins: [
    // webpack 分析页面
    // new BundleAnalyzerPlugin({ analyzerPort: 3333 }),
    //   new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-cheap-module-source-map' // 忽略列信息的ts源码
};
