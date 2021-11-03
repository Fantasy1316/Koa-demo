const Router = require('koa-router')
const { regisetr } = require('../controller/user.controller')
const { userValidator, verifyUser } = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' })

router.post('/register', userValidator, verifyUser, regisetr)

module.exports = router
