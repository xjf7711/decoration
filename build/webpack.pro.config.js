/*
 * @功能描述:
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: './',
  },
  plugins: [
    new CleanWebpackPlugin(),
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
  ]
}
