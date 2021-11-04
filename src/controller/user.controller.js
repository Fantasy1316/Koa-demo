const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.constant')

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
    const { user_name, password } = ctx.request.body

    ctx.body = `欢迎回来，${user_name}`
  }
}

module.exports = new UserController()
