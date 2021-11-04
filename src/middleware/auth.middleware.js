const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpiredError,
  invalidToken,
  hasNotAdminPermission
} = require('../constant/err.constant')

/** 用户是否登录 */
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    console.error('token 校验错误：', error)
    switch (error.name) {
      case 'TokenExpiredError':
        ctx.app.emit('error', tokenExpiredError, ctx)
        return

      default:
        ctx.app.emit('error', invalidToken, ctx)
        return
    }
  }

  await next()
}

/** 是否拥有管理员权限 */
const hasAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    console.error('没有管理员权限', ctx.state.user)
    ctx.app.emit('error', hasNotAdminPermission, ctx)
    return
  }

  await next()
}

module.exports = {
  auth,
  hasAdminPermission
}
