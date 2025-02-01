/*
 *
 */
// const webpack = require("webpack");

// webpack打包文件体积和依赖关系的可视化
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    // 多个html页面
    // new HtmlWebpackPlugin({
    //   template: './src/index.html', // 把哪个html文件打包到dist目录中
    //   title: 'decoration start',
    //   filename: 'index.html', // 输出什么名字 默认 index.html
    //   // chunks: ['advertisement', 'commCss', 'dom', 'utils'], // todo ??? 当前页面所需要哪些模块 模块引入顺序和入口设置时的先后有关
    //   minify: {
    //     collapseWhitespace: true
    //   },inject: true, // 注入生成的脚本到页面中
    //   templateParameters: {
    //     baseHref: './' // 传递 baseHref 参数给模板
    //   },
    //   // base:  { href: './' }, // 这里设置你的基本路径，它会被插入到 <base> 标签的 href 属性中
    //   hash: true
    // }),
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
