require('./check-versions')()// 检查 Node 和 npm 版本
//配置文件
var config = require('../config')// 获取 config/index.js 的默认配置
/*
 ** 如果 Node 的环境无法判断当前是 dev / product 环境
 ** 使用 config.dev.env.NODE_ENV 作为当前的环境
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')// 一个可以强制打开浏览器并跳转到指定 url 的插件
var path = require('path')// 使用 NodeJS 自带的文件路径工具
var express = require('express')//nodeJS框架，在这里用它启动webserver
var webpack = require('webpack')//核心编译工具
var proxyMiddleware = require('http-proxy-middleware')//http协议代理的中间件 可以代理和转发一些api
var webpackConfig = require('./webpack.dev.conf') // 使用 dev 环境的 webpack 配置

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port /* 如果没有指定运行端口，使用 config.dev.port 作为运行端口 */
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser /* 自动打开浏览器 */
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//拿到代理接口
var proxyTable = config.dev.proxyTable;

var app = express();/* 使用 express 启动一个服务 */
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var foodTypes = appData.foodTypes;
var shopLists = appData.shopLists;
var hotWord = appData.hotWord;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
	res.json({
		errno: 0,
		data: seller
	});
});

apiRoutes.get('/goods', function (req, res) {
	res.json({
		errno: 0,
		data: goods
	});
});

apiRoutes.get('/ratings', function (req, res) {
	res.json({
		errno: 0,
		data: ratings
	});
});
  apiRoutes.get('/foodTypes', function (req, res) {
  res.json({
    errno: 0,
    data: foodTypes
  });
});
apiRoutes.get('/shopLists', function (req, res) {
  res.json({
    errno: 0,
    data: shopLists
  });
});
apiRoutes.get('/hotWord', function (req, res) {
  res.json({
    errno: 0,
    data: hotWord
  });
});

app.use('/api', apiRoutes);
//编译
var compiler = webpack(webpackConfig)// 启动 webpack 进行编译
/* 启动 webpack-dev-middleware，服务端开发的时候，在内存中生成打包好的js文件*/
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,   //  '/'引入html的时候作为js的路径
  quiet: true//对控制台不显示任何内容
})
/* 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload */
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
/* 当 html-webpack-plugin 模板更新的时候强制刷新页面 */
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// 将 Hot-reload 挂在到 express 服务上并且输出相关的状态、错误
app.use(hotMiddleware)

// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
//上边指定了静态资源的输出路径
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})
// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
