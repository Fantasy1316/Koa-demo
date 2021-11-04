const jwt = require('jsonwebtoken')
const {
  createUser,
  getUserInfo,
  updateUserById
} = require('../service/user.service')
const {
  userRegisterError,
  userLoginError,
  updatePasswordError
} = require('../constant/err.constant')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async regisetr(ctx, next) {
    const { user_name, password } = ctx.request.body
    try {
      const res = await createUser(user_name, password)
      ctx.body = {
        code: 0,
        data: {
          id: res.id,
          user_name: res.user_name
        },
        message: '用户注册成功'
      }
    } catch (error) {
      console.error('用户注册错误：', error)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: '0',
        data: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        },
        message: '用户登录成功'
      }
    } catch (error) {
      console.error('用户登录失败：', error)
      ctx.app.emit('error', userLoginError, ctx)
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user
    const { password } = ctx.request.body
    console.log(id, password)

    try {
      const res = await updateUserById({ id, password })
      if (res) {
        ctx.body = {
          code: 0,
          data: null,
          message: '密码更新成功'
        }
      } else {
        console.error('更新密码失败：', { id, password })
        ctx.app.emit('error', updatePasswordError, ctx)
      }
    } catch (error) {
      console.error('更新密码失败：', error)
      ctx.app.emit('error', updatePasswordError, ctx)
    }
  }
}

module.exports = new UserController()
