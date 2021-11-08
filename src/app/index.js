const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errorHandler = require('./errHandler')

const app = new Koa()

const router = require('../router')

/** 注意：KoaBody 中间件必须在所有路由加载之前使用  */
app.use(
  KoaBody({
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
  })
)
/** 设置静态资源文件夹 */
app.use(KoaStatic(path.join(__dirname, '../upload')))
/** 设置全局参数校验 */
app.use(parameter(app))
/** 注册路由 */
app.use(router.routes()).use(router.allowedMethods())

// 同意错误处理
app.on('error', errorHandler)

module.exports = app
