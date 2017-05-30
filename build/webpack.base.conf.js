var path = require('path')// 使用 NodeJS 自带的文件路径工具
var utils = require('./utils')//工具
var config = require('../config')//项目生产环境和开发环境的配置项
var vueLoaderConfig = require('./vue-loader.conf')
//定义了当前项目的根目录
// 拼接我们的工作区路径为一个绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //入口配置
  entry: {
    app: './src/main.js'
  },
  //输出配置
  output: {
    //输出目录 在index.js里边有这个参数
    path: config.build.assetsRoot,//assetsRoot: path.resolve(__dirname, '../dist')
    // 这个选项告诉webpack要把编译后的文件输出到硬盘的什么位置上，filename被用来确保输在这个目录中的文件是独一无二的
    //输出文件名称 name就是app
    filename: '[name].js',// 这里定义了输出的文件名，谨记只能填写文件名，不能包含目录。
    publicPath: process.env.NODE_ENV === 'production'
      //publicPath用来指定输出文件的公共URL地址，当我们在浏览器浏览的时候需要配置它
      ? config.build.assetsPublicPath // '/'
      : config.dev.assetsPublicPath// '/'
  },
  //通过require import模块的相关配置
  resolve: {
    //补充文件后缀
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        //在loader之前处理          //如果有use要求顺序，有先后顺序
        enforce: "pre",           //为了安全起见，您可以使用enforce: "pre"部分来检查源文件，而不是由其他装载器修改
        //只检查这些文件
        include: [resolve('src'), resolve('test')],
        //为loaders提供额外的设置选项
        options: {
          formatter: require('eslint-friendly-formatter')//美化命令行输出的插件
        }
      },
      //vue-loader会解析这个文件中的每个语言块，然后传输到其它的loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig  //options为loaders提供额外的设置选项
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]   //检测范围
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          //文件大小最大
          limit: 10000,       //小于10000B的文件将转为base64
          name: utils.assetsPath('img/[name].[hash:7].[ext]')    //最后输出的路径和名字
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
