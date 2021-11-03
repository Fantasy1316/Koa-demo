const { model } = require('../db/seq')

module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    data: ''
  },
  userAlreadyExited: {
    code: '10001',
    message: '用户已存在',
    data: ''
  }
}
