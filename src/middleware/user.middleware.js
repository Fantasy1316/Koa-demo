const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userNotExit,
  invalidPassword,
  userLoginError
} = require('../constant/err.constant')

/** 验证 用户名/密码是否为空 */
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  if (!user_name || !password) {
    console.error('用户名或密码为空：', { user_name, password })
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

/** 验证用户名是否已经错在 */
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const userInfo = await getUserInfo({ user_name })
    if (userInfo) {
      console.error('用户名已存在：', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误：', error)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

/** 密码加密 */
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

/** 登录验证 */
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  try {
    const userInfo = await getUserInfo({ user_name })

    if (!userInfo) {
      console.error('用户不存在：', { user_name })
      ctx.app.emit('error', userNotExit, ctx)
      return
    }

    if (!bcrypt.compareSync(password, userInfo.password)) {
      console.error('密码不匹配：', { user_name, password })
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误：', { user_name })
    ctx.app.emit('error', userLoginError, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}
