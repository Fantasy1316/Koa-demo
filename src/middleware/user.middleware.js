const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited
} = require('../constant/err.constant')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  if (!user_name || !password) {
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  const userInfo = await getUserInfo({ user_name })
  if (userInfo) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser
}
