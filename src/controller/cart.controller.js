const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCart,
  unSelectAllCart
} = require('../service/cart.server')
const { cartFormatError } = require('../constant/err.constant')

class CartController {
  async add(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { goods_id } = ctx.request.body

    const res = await createOrUpdate(user_id, goods_id)

    ctx.body = {
      code: 0,
      data: res,
      mssage: '添加购物车成功'
    }
  }

  async findAll(ctx, next) {
    const { page = 1, pageSize = 10 } = ctx.request.query

    const res = await findCarts(page, pageSize)

    ctx.body = {
      code: 0,
      data: res,
      message: '获取购物车列表成功'
    }
  }

  async update(ctx, next) {
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body

    if (number === undefined && selected === undefined) {
      cartFormatError.message = '商品数量和选中状态不能同时为空'
      ctx.app.emit('error', cartFormatError, ctx)
      return
    }

    const res = await updateCarts({ id, number, selected })

    ctx.body = {
      code: 0,
      data: res,
      message: '更新购物车成功'
    }
  }

  async remove(ctx, next) {
    const { ids } = ctx.request.body
    const res = await removeCarts(ids)

    ctx.body = {
      code: 0,
      data: res,
      message: '删除购物车数据成功'
    }
  }

  async selectAll(ctx, next) {
    const { id: user_id } = ctx.state.user

    const res = await selectAllCart(user_id)

    ctx.body = {
      code: 0,
      data: res,
      message: '购物车全选成功'
    }
  }

  async unSelectAll(ctx, next) {
    const { id: user_id } = ctx.state.user

    const res = await unSelectAllCart(user_id)

    ctx.body = {
      code: 0,
      data: res,
      message: '购物车全不选成功'
    }
  }
}

module.exports = new CartController()
