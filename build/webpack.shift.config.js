const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const resolve = (dir) => path.join(__dirname, '../', dir);

console.log('run shift');

module.exports = {
  entry: {
    'shift': resolve('src/foo.js')
  },
  output: {
    filename: `[name].js`,
    path: resolve('shift'),
    clean: true,
    library: {
      // name: 'TsLib',
      type: 'umd',
      export: 'default',
    },
    // globalObject: 'this'
  },
  resolve: {
    // 配置解析模块路径别名: 优点 简写路径 缺点 写路径时没有提示
    alias: {
      // $css: path.resolve(__dirname, 'src/css'),
      src: resolve(__dirname, '../src')
    },
    // 配置省略文件路径的后缀名，引用文件时，后缀名就可以省略了
    extensions: ['.js', '.ts', '.tsx'] // '.json', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录,下面这样配置之后，可以直接按照路径找到node_modules,不用再挨个遍历了
    // modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      },
      {
        // eslint只检查ts语法
        test: /\.ts$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve(__dirname, 'src'), // 指定检查的目录
        // 只检查自己写的js代码不检查第三方库的代码
        exclude: /node_modules/,
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          // formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
          // 自动修复可以修复的错误
          fix: true
        }
      },
      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      // less todo scss
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',   // 处理css兼容性
          'less-loader'
        ]
      },
      // Extracts the compiled CSS from the SASS files defined in the entry
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets CSS
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',   // 处理css兼容性
          {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      },
      // css中图像
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[hash:10].[ext]',
          limit: 10 * 1024,
          outputPath: 'images', // 把图像打包到指定目录
          esModule: false
        }
      },
      // html图像
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 字体图标
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 处理的格式
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]', // 输出文件名设置
          outputPath: 'fonts' // 输出目录
        }
      },

      // es6转es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 不要处理node_modules
      },
      {
        test: /foo.js$/, // 需要转换的文件
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'jscodeshift-loader',
            options: {
              transform: './transform.js', // 转换器脚本路径
              recast: require('recast') // 引入recast
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 提取css
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'  // 设置css输出的文件名
    }),
    // 压缩css
    // new OptimizeCssAssetsWebpackPlugin() // webpack5支持有问题
    // new CompressionPlugin(),
  ],
  // chainWebpack: config => {
  //   config.optimization.delete('splitChunks')
  //   config.plugins.delete('copy')
  //   config.plugins.delete('preload')
  //   config.plugins.delete('prefetch')
  //   config.plugins.delete('html')
  //   config.plugins.delete('hmr')
  //   config.entryPoints.delete('app')
  // }
  optimization: {
    // moduleIds: 'deterministic', // 未变化的 hash 都应该保持一致
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
