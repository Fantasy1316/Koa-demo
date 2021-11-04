const Router = require('koa-router')
const { regisetr, login } = require('../controller/user.controller')
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' })

/** 用户注册 */
router.post('/register', userValidator, verifyUser, cryptPassword, regisetr)

/** 用户登录 */
router.post('/login', userValidator, verifyLogin, login)

module.exports = router
