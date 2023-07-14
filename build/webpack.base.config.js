// 引入路径管理模块
const path = require('path');

// 引入html打包插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// const TerserPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 生成压缩文件，需要服务器支持
// const CompressionPlugin = require('compression-webpack-plugin');

// 查看当前是哪种模式
console.log('当前模式', process.argv); // process.env.NODE_ENV);

module.exports = {
  // 入口 (单个入口 或多个入口),现在是多入口
  entry: {
    app: './src/main.ts',
  },
  // 出口
  output: {
    // 文件名称（指定名称+目录）
    filename: '[name].js', // '[name].[fullhash:8].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    // chunkFilename: 'lib/[name]_chunk.js', // 自定义非入口chunk的名称 没有任何作用
    // library 一般是结合dll使用
    library: {
      // 整个库向外暴露的变量名
      name: 'TypeDomApp',
      type: 'umd',
      // export: 'type-dom-app' // default umd
    },
    // libraryTarget: 'window' // 变量名添加到哪个全局上，browser浏览器端添加到window上
    // libraryTarget: 'global' // 变量名添加到哪个全局上，node服务端添加到global上
    // libraryTarget: 'commonjs'
  },
  target: 'web',
  resolve: {
    // 配置解析模块路径别名: 优点 简写路径 缺点 写路径时没有提示
    // alias: {
    //   // $css: path.resolve(__dirname, 'src/css'),
    //   src: path.resolve(__dirname, '../src')
    // },
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
        include: path.resolve(__dirname, 'src'), // 指定检查的目录
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
      // less
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
      }
    ]
  },
  plugins: [
    //  Error: clean-webpack-plugin only accepts an options object. See:
    // https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
    // at new CleanWebpackPlugin (\node_modules\clean-webpack-plugin\dist\clean-webpack-plugin.js:
    // new CleanWebpackPlugin(),
    // 多个html页面
    new HtmlWebpackPlugin({
      template: './public/index.html', // 把哪个html文件打包到dist目录中
      title: 'type dom app',
      filename: 'index.html', // 输出什么名字 默认index.html
      // chunks: ['advertisement', 'commCss', 'dom', 'utils'], // todo ??? 当前页面所需要哪些模块 模块引入顺序和入口设置时的先后有关
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      hash: true
    }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'  // 设置css输出的文件名
    }),
    // 压缩css
    // new OptimizeCssAssetsWebpackPlugin() // webpack5支持有问题
    // new CompressionPlugin(),
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
      // new TerserPlugin()
    ]
  },
  // 模式   development  production
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
  // 通过 webpack-dev-server 的这些配置，能够以多种方式改变其行为。
  devServer: {
    // 该选项允许将允许访问开发服务器的服务列入白名单。
    // 'auto' | 'all' [string]
    // 当设置为 'all' 时会跳过 host 检查。并不推荐这样做，因为不检查 host 的应用程序容易受到 DNS 重绑定攻击。
    // 当设置为 'auto' 时，此配置项总是允许 localhost、 host 和 client.webSocketURL.hostname：
    // allowedHosts: [
    //   'host.com',
    //   'subdomain.host.com',
    //   'subdomain2.host.com',
    //   'host2.com',
    // ],
    // 这个配置用于在启动时通过 ZeroConf 网络广播你的开发服务器。
    // boolean object
    // bonjour: true,
    client: {
      // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
      // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
      logging: 'info',
      // boolean = true object: { errors boolean = true, warnings boolean = true }
      // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
      overlay: true,
      // 如果你只想显示错误信息：
      // overlay: {
      //   errors: true,
      //   warnings: false,
      // },
      // 在浏览器中以百分比显示编译进度。
      progress: true,
      // 'ws' | 'sockjs' string
      // 该配置项允许我们为客户端单独选择当前的 devServer 传输模式，或者提供自定义的客户端实现。这允许指定浏览器或其他客户端与 devServer 的通信方式。
      // webSocketTransport: 'ws',
    },
    // webSocketServer: 'ws',
    //  boolean = true
    // 启用 gzip compression：
    // 启动gzip压缩
    compress: true,
    // 域名
    // host: 'localhost',
    // 开启HMR功能 devServer上支持了HMR
    // 当更改了webpack配置后，新配置要想生效，必须重启webpack服务
    // 'only' boolean = true
    // 启用 webpack 的 热模块替换 特性：
    hot: true,
    // boolean = true
    // 默认情况下，当监听到文件变化时 dev-server 将会重新加载或刷新页面。
    // 为了 liveReload 能够生效，devServer.hot 配置项必须禁用或者 devServer.watchFiles 配置项必须启用。
    // 将其设置为 false 以禁用 devServer.liveReload：
    // liveReload: false,
    // boolean string [string] object [object]
    // 告诉 dev-server 在服务器已经启动后打开浏览器。设置其为 true 以打开你的默认浏览器。
    // open: true,
    // 在浏览器中打开指定页面：
    // open: ['/my-page'],
    // 在浏览器中打开多个指定页面：
    // open: ['/my-page', '/another-page'],
    // 提供要使用的浏览器名称，而不是默认名称：
    // open: {
    //   app: {
    //     name: 'google-chrome',
    //   },
    // },
    // 该对象接收所有 open 配置项：
    // 浏览器应用程序名称与平台相关。不要在可重用模块中硬编码它。
    // 例如，'Chrome' 在 macOS 是 'Google Chrome'，在 Linux 是 'google-chrome'，在 Windows 是 'chrome'。
    // open: {
    //   app: {
    //     name: 'google-chrome',
    //     arguments: ['--incognito', '--new-window'],
    //   },
    // },
    // 端口号
    port: 8001,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 浏览器与服务器之间存在跨域问题，但与代理服务器之间不存在跨域，代理服务器与服务器之间也不存在跨域，所以，发送到代理服务器，再由它转发到服务器，可以避免跨域
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      // '/api': {
      //   target: 'http://localhost:3000',
      //   // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // },
      // '/source': {
      //   target: 'http://219.239.83.20:18800/',
      //   secure: false, // 这是签名认证，http和https区分的参数设置
      //   // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
      //   pathRewrite: {
      //     '^/source': ''
      //   }
      // }
    },
    //  boolean string [string] object [object]
    // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。
    // 将其设置为 false 以禁用：
    // static: false,
    // 监听单个目录：
    // static: ['assets'],
    // 监听多个进后台资源目录：
    // static: ['assets', 'css'],
    // static: {
    //   //  string = path.join(process.cwd(), 'public')
    //   assetsPublicPath: '/',
    //   assetsSubDirectory: 'static',
    //   // 告诉服务器从哪里提供内容。只有在你希望提供静态文件时才需要这样做。static.publicPath 将会被用来决定应该从哪里提供 bundle，并具有优先级。
    //   directory: path.join(__dirname, 'public'),
    // },
  },
  devtool: false
};
