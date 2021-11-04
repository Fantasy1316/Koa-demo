const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken } = require('../config/config.default')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
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

module.exports = {
  auth
}
