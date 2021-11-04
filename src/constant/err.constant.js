const { model } = require('../db/seq')

module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    data: null
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已存在',
    data: null
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    data: null
  },
  userNotExit: {
    code: '10004',
    message: '用户不存在',
    data: null
  },
  invalidPassword: {
    code: '10005',
    message: '密码不匹配',
    data: null
  },
  userLoginError: {
    code: '10006',
    message: '用户登录失败',
    data: null
  }
}