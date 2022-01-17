"use strict";
const path = require("path");
const webpack = require("webpack");
/**  Autoprefixer是一款自动管理浏览器前缀的插件， 可以解析css文件并且添加前缀到css内容里，
 * 使用Can I Use(caniuse网站)的数据决定哪些前缀是需要的。该插件css解析器采用postcss，
 * 使用Browserslist库，可以对浏览器的版本做精确设置。 */
const autoprefixer = require("autoprefixer");
/**页面适配插件 */
const pxtorem = require("postcss-pxtorem");
/**代码压缩插件 */
const CompressionWebpackPlugin = require("compression-webpack-plugin");
/**主题色设置插件 */
const ThemeColorReplacer = require("webpack-theme-color-replacer");

const forElementUI = require("webpack-theme-color-replacer/forElementUI");

/**path.join([path1][, path2][, ...])
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。 __dirname：获取当前模块文件所在目录的完整绝对路径 */
function resolve(dir) {
  return path.join(__dirname, dir);
}

const title = "vue-pc-template"; //page title

// process.env 是 Node.js 中的一个环境对象。其中保存着系统的环境的变量信息。
const port = process.env.port || process.env.npm_config_port || 9100; // dev port

/** * 如果您计划将站点部署在子路径下，则需要设置 publicPath，
 * 例如 GitHub Pages。如果您计划将站点部署到 https://foo.github.io/bar/，
 * 那么 publicPath 应该设置为“/bar/”。
 * 在大多数情况下，请使用 '/' !!! * 详情：https://cli.vuejs.org/config/#publicpath */
const vueCliConfiguration = {
  indexPath: "index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  transpileDependencies: ["single-spa", "qiankun", "import-html-entry"], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  assetsDir: "", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  /**默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
   * 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在
   * https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
   * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径 */
  publicPath: "./",
  /**默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   * 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
   * 如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。 */
  filenameHashing: true,
  outputDir: "./dist", //当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  productionSourceMap: process.env.NODE_ENV === "development", //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  lintOnSave: false, //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  devServer: {
    proxy: {
        [process.env.VUE_APP_BASE_API]:{
            target:'',//目标代理接口地址
            changeOrigin:true,//是否开启代理
            // ws: true, // 是否启用websockets
            pathRewrite: { //  /api开头的请求会去到target下请求
                '^/api': ''        //   替换/api 为空字符
              }
        }
    }
  },
  configureWebpack:config=>{
      config.name = title
      //添加别名
      config.resolve.alias = {
        '@':resolve("src")
      },
      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          jQuery: "jquery",
          jquery: "jquery",
          $: "jquery"
        }),
        new ThemeColorReplacer({
          fileName: "style/theme-colors.[contenthash:8].css",
          matchColors: [...forElementUI.getElementUISeries("#014A99")],
          changeSelector: forElementUI.changeSelector,
          isJsUgly: process.env.NODE_ENV === "production"
        })
      ];
      // 生产环境开启gzip
      if (process.env.NODE_ENV === "production") {
        config.plugins = [
          ...config.plugins,
          // 开启gzip
          new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: productionGzipExtensions,
            threshold: 10240,
            minRatio: 0.8
          })
        ];
      }
  },
  chainWebpack(config) {
    // config.resolve.symlinks(true)
    // config.plugin('SpeedMeasurePlugin').use(SpeedMeasurePlugin)
    // config.plugin('webpack-report').use(BundleAnalyzerPlugin)
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("../venusui/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("../venusui/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.minimize(true); // 压缩混淆
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
            chunks: "initial" // only package third parties that are initially dependent
          },
          swiper: {
            name: "chunk-swiper",
            priority: 20,
            enforce: true,
            test: /[\\/]node_modules[\\/]_?swiper(.*)/
          },
          printJs: {
            name: "chunk-printJs",
            priority: 20,
            enforce: true,
            test: /[\\/]node_modules[\\/]_?print-js(.*)/
          },
          echarts: {
            name: "chunk-echarts",
            priority: 20,
            enforce: true,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            enforce: true,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          components: {
            name: "components",
            minSize: 0,
            test: /[\\/]venusui[\\/](components)[\\/]/,
            priority: 30
          },
          venusui: {
            name: "venusui",
            minSize: 0,
            enforce: true,
            test: /[\\/]venusui[\\/]/,
            priority: 20
          }
        }
      });
      config.module
        .rule("js")
        .use("thread-loader")
        .end();
      config.optimization.runtimeChunk("single");
    });
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: isProduction ? true : false,
    // 开启 CSS source maps?
    // sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ["*"] // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
            // minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
            // unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
            // selectorBalckList: ['van'], // 匹配不被转换为rem的选择器
            // replace: true, // 替换包含rem的规则，而不是添加回退
            // mediaQuery: false // 允许在媒体查询中转换px
          })
        ]
      }
    }
  }
};
module.exports = vueCliConfiguration; // 导出vue.config.js的配置
