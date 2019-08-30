/* vue.config.js */
/** vue.config.js
 * 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
 * 你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。
 * */

module.exports = {
  /**
   * 部署应用包时的基本 URL。
   * 用法和 webpack 本身的 output.publicPath 一致，
   * 但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 baseUrl 而不要直接修改 webpack 的 output.publicPath。
   * 我们默认假设你的应用将会部署在域名的根部，
   * 比如 https://www.my-app.com/
   * 如果你的应用时部署在一个子路径下，那么你需要在这里
   * 指定子路径。比如，如果你的应用部署在 https://www.foobar.com/my-app/
   * 那么将这个值改为 `/my-app/`
   * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，
   * 这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
   * */
  baseUrl: "/",
  /**
   * 输出文件目录。
   * 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   * */
  outputDir: "dist",
  /**
   * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   * 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
   * */
  assetsDir: "",
  /**
   * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
   * */
  indexPath: "index.html",
  /**
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   * 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
   * 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
   * */
  filenameHashing: true,

  /**
   * type: object
   * 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
     一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
     或一个指定其 entry 的字符串。
   *
   * */
  pages: undefined,
  /**
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
   * 这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   * 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
   * */
  lintOnSave: true,
  /**
   * 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
   * */
  runtimeCompiler: false,
  /**
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   * */
  transpileDependencies: [],
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * */
  productionSourceMap: true,
  /**
   * 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
   * 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   * */
  crossOrigin: undefined,
  /**
   * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
   * 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
   * 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
   * 另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
   * */
  integrity: false,
  /**
   *  Type: Object | Function
   *  如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   *  如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   * */
  configureWebpack: () => {},
  /**
   * Type: Fuction
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
   * 允许对内部的 webpack 配置进行更细粒度的修改。
   * */
  chainWebpack: () => {},
  /**
   *
   * */
  css: {
    /**
     * 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
     * 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
     * */
    modules: false,
    /**
     * Default: 生产环境下是 true，开发环境下是 false
     *
     * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
     * 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
     * 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
     * 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
     * 然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
     *
     * 是否使用css分离插件 ExtractTextPlugin
     * */
    extract: process.env.NODE_ENV !== "production",

    /**
     * 是否为 CSS 开启 source map。
     * 设置为 true 之后可能会影响构建的性能。
     * */
    sourceMap: false,

    /**
     * css预设器配置项
     * 向 CSS 相关的 loader 传递选项。
     * */
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  /**
   * webpack-dev-server 相关配置
   * 所有 webpack-dev-server 的选项都支持。
   * 注意：
   * 有些值像 host、port 和 https 可能会被命令行参数覆写。
   * 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 baseUrl 同步以保障正常的工作。
   * */
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // disableHostCheck: true, // 进行配置反向代理
    /**
     * 设置代理
     * Type: string | Object
     * 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
     * 这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
     * */
    proxy: {
      // https://github.com/chimurai/http-proxy-middleware#options
      "/api": {
        target: "<url>",
        ws: true, // true/false: if you want to proxy websockets
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      },
      "/api/getDiscList": {
        // target: 'http://192.168.0.57:8081',  // 你接口的域名 设置你调用的接口域名和端口号 别忘了加http
        target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
        // target: 'http://115.29.44.53:8080',
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/fsy': ''
          "^/api/getDiscList": "" // 这里理解成用'/ledger'代替target里面的地址，后面组件中我们掉接口时直接用ledger代替
          // 比如我要调用'http://192.168.0.57:8081/ledger/add'，直接写'/ledger/add'即可
        },
        headers: {
          Referer: "https://c.y.qq.com/",
          host: "c.y.qq.com"
        }
        // 正式环境： 接口地址 /api/**                         前端页面地址
        // 开发环境： 接口地址 http://www.xxx.com/api/**       前端页面地址  http://localhost:8080
      }
    }

    // open: process.platform === "darwin",
    // host: "0.0.0.0",
    // port: 8080,
    // https: false,
    // hotOnly: false,
    //
    // before: app => {}
  },
  /**
   * 是否为 Babel 或 TypeScript 使用 thread-loader。
   * use thread-loader for babel & TS in production build
   * 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
   * enabled by default if the machine has more than 1 cores
   * */
  parallel: require("os").cpus().length > 1,

  /**
   * PWA 插件相关配置
   * 向 PWA 插件传递选项。
   * Type: Object
   * see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   * */
  pwa: {},
  /**
   * 第三方插件配置
   * 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
   * */
  pluginOptions: {},

  /**
   *
   * */

  /**
   *
   * */

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  vueLoader: {},

  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  dll: false
};
