const { model } = require('../db/seq')

module.exports = {
  userFormateError: {
    code: 10001,
    message: '用户名或密码为空',
    data: null
  },
  userAlreadyExited: {
    code: 10002,
    message: '用户已存在',
    data: null
  },
  userRegisterError: {
    code: 10003,
    message: '用户注册错误',
    data: null
  },
  userNotExit: {
    code: 10004,
    message: '用户不存在',
    data: null
  },
  invalidPassword: {
    code: 10005,
    message: '密码不匹配',
    data: null
  },
  userLoginError: {
    code: 10006,
    message: '用户登录失败',
    data: null
  },
  updatePasswordError: {
    code: 10007,
    message: '密码更新失败',
    data: null
  },
  tokenExpiredError: {
    code: 10101,
    message: 'token 已过期',
    data: null
  },
  invalidToken: {
    code: 10102,
    message: '无效的 token',
    data: null
  },
  hasNotAdminPermission: {
    code: 10103,
    message: '没有管理员权限',
    data: null
  },
  uploadFileError: {
    code: 10201,
    message: '图片上传失败',
    data: null
  },
  goodsFormatError: {
    code: 10203,
    message: '商品参数格式错误',
    data: null
  },
  publishGoodsError: {
    code: 10204,
    message: '发布商品失败',
    data: null
  },
  invalidGoodsId: {
    code: 10205,
    message: '无效的商品ID',
    data: null
  },
  updateGoodsError: {
    code: 10206,
    message: '更新商品失败',
    data: null
  },
  removeGoodsError: {
    code: 10207,
    message: '下架商品失败',
    data: null
  },
  restoreGoodsError: {
    code: 10208,
    message: '上架商品失败',
    data: null
  },
  findGoodsError: {
    code: 10209,
    message: '获取商品失败',
    data: null
  },
  cartFormatError: {
    code: 10301,
    message: '购物车数据格式错误',
    data: null
  },
  addrFormatError: {
    code: 10401,
    message: '地址数据格式错误',
    data: null
  }
}
