require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')// 一个很好看的 loading 插件
var rm = require('rimraf')//专门用于删除模块的插件
var path = require('path')
var chalk = require('chalk')//chalk是专门用来处理命令行打印着色的一个工具
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')// 使用 ora 打印出 loading + log
spinner.start()// 开始 loading 动画

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {   //dist/static
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
