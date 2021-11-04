const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')

const errorHandler = require('./errHandler')

const app = new Koa()

const router = require('../router')

/** 注意：KoaBody 中间件必须在所有路由加载之前使用  */
// app.use(
//   KoaBody({
//     multipart: true,
//     formidable: {
//       uploadDir: path.join(__dirname, '../upload'),
//       keepExtensions: true
//     }
//   })
// )
/** 设置静态资源文件夹 */
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(router.routes()).use(router.allowedMethods())

// 同意错误处理
app.on('error', errorHandler)

module.exports = app
