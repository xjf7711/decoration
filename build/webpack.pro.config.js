/*
 * @功能描述:
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: './',
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    moduleIds: 'deterministic', // 未变化的 hash 都应该保持一致
    runtimeChunk: 'single', // 拆包 runtime
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // commons: {
        //   name: 'commons',
        //   chunks: 'initial',
        //   minChunks: 2,
        // },
        vendor: { // 拆包 vendors
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // 关于 source maps 说明
      // 只对 devtool 选项的 source-map，inline-source-map，hidden-source-map 和 nosources-source-map 有效。
      // 为何如此？
      // eval 会包裹 modules，通过 eval("string")，而 minimizer 不会处理字符串。
      // cheap 不存在列信息，minimizer 只产生单行，只会留下一个映射。
      // 使用支持的 devtool 值可以生成 source map。
      new TerserPlugin()
    ]
  },
};
