const KoaRouter = require('koa-router')

const router = new KoaRouter({ prefix: '/addr' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')

const {
  create,
  findAll,
  update,
  remove,
  setDefault
} = require('../controller/addr.controller')

router.post(
  '/',
  auth,
  validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: 'string'
  }),
  create
)

router.get('/', auth, findAll)

router.put(
  '/:id',
  auth,
  validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: 'string'
  }),
  update
)

router.delete('/:id', auth, remove)

router.patch('/:id', auth, setDefault)

module.exports = router
