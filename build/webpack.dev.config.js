/*
 *
 */
// const webpack = require("webpack");

// webpack打包文件体积和依赖关系的可视化
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  plugins: [
    // webpack 分析页面
    // new BundleAnalyzerPlugin({ analyzerPort: 3333 }),
    //   new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          // 使用 glob 模式来排除 index.html
          globOptions: {
            ignore: ['**/index.html'],
          },
          to: 'assets' // 复制到输出目录的根目录
        }
      ]
    })
  ],
  devtool: 'eval-cheap-module-source-map' // 忽略列信息的ts源码
};
