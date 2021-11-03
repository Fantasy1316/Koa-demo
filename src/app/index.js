const Koa = require('koa')
const KoaBody = require('koa-body')

const errorHandler = require('./errHandler')

const app = new Koa()

const userRouter = require('../router/user.route')

/** 注意：KoaBody 中间件必须在所有路由加载之前使用  */
app.use(KoaBody())
app.use(userRouter.routes())

// 同意错误处理
app.on('error', errorHandler)

module.exports = app
