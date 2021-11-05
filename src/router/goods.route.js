const path = require('path')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const router = new Router({ prefix: '/goods' })

const { create } = require('../controller/goods.controller')

const {
  upload,
  update,
  remove,
  restore,
  findAll
} = require('../controller/goods.controller')
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

/** 更新商品 */
router.put('/:id', auth, hasAdminPermission, validator, update)

/** 硬删除商品 */
// router.delete('/:id', auth, hasAdminPermission, remove)

/** 下架商品 */
router.post('/:id/off', auth, hasAdminPermission, remove)

/** 上架商品 */
router.post('/:id/on', auth, hasAdminPermission, restore)

/** 查询商品列表 */
router.get('/', findAll)

module.exports = router
