const User = require('../model/user.model')

class UserService {
  // 创建用户
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password })
    return res
  }

  // 查找用户
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })

    return res ? res.dataValues : null
  }

  // 更新用户
  async updateUserById({ id, user_name, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, { where: whereOpt })

    return res[0]
  }
}

module.exports = new UserService()
