const KoaRouter = require('koa-router')

const router = new KoaRouter({ prefix: '/carts' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const { add, findAll, update, remove, selectAll, unSelectAll } = require('../controller/cart.controller')

router.post('/', auth, validator({ goods_id: 'number' }), add)

router.get('/', auth, findAll)

router.patch('/:id', auth, validator({
  number: { type: 'number', required: false },
  selected: { type: 'bool' , required: false }
}), update)

router.delete('/', auth, validator({ ids: 'array' }), remove)

router.post('/selectAll', auth, selectAll)

router.post('/unSelectAll', auth, unSelectAll)


module.exports = router