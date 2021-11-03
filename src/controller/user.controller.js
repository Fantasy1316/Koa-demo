const { createUser } = require('../service/user.service')

class UserController {
  async regisetr(ctx, next) {
    const { user_name, password } = ctx.request.body
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
