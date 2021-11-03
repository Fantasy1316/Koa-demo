const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
  async regisetr(ctx, next) {
    const { user_name, password } = ctx.request.body

    if (!user_name || !password) {
      ctx.body = {
        code: 10001,
        data: null,
        message: '用户名或密码不能为空'
      }
      return
    }

    const userInfo = await getUserInfo({ user_name })
    if (userInfo) {
      ctx.body = {
        code: 10002,
        data: null,
        message: '用户已存在'
      }
      return
    }

    const res = await createUser(user_name, password)

    ctx.body = {
      code: 0,
      data: {
        id: res.id,
        user_name: res.user_name
      },
      message: '用户注册成功'
    }
  }
}

module.exports = new UserController()
