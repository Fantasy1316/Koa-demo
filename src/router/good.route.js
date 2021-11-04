const path = require('path')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const router = new Router({ prefix: '/goods' })
const { upload } = require('../controller/good.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
// const { koaBody } = require('../middleware/koaBody.middleware')

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

module.exports = router
