const path = require('path')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const router = new Router({ prefix: '/goods' })

const { create } = require('../controller/goods.controller')

const { upload } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

/** 商品图片上传 */
router.post(
  '/upload',
  auth,
  hasAdminPermission,
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true
    }
  }),
  upload
)

/** 发布商品 */
router.post('/', auth, hasAdminPermission, validator, create)

module.exports = router
