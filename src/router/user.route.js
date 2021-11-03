const Router = require('koa-router')
const { regisetr } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

router.post('/register', regisetr)

module.exports = router
