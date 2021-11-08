const {
  createOrder,
  finAllOrder,
  updateOrderStatus
} = require('../service/order.server')

class OrderController {
  async create(ctx) {
    const { id: user_id } = ctx.state.user
    const { address_id, goods_info, total } = ctx.request.body
    const order_number = 'DOI' + new Date().getTime()

    console.log(user_id, address_id, goods_info, order_number, total)

    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      order_number,
      total
    })

    ctx.body = {
      code: 0,
      data: res,
      message: '创建订单成功'
    }
  }

  async findAll(ctx) {
    const { page = 1, pageSize = 10, status = 0 } = ctx.request.query

    const res = await finAllOrder(page, pageSize, status)

    ctx.body = {
      code: 0,
      data: res,
      message: '获取订单列表成功'
    }
  }

  async update(ctx) {
    const { id } = ctx.request.params
    const { status } = ctx.request.body

    console.log(id, status)

    const res = await updateOrderStatus(id, status)

    ctx.body = {
      code: 0,
      data: res,
      message: '更新订单状态成功'
    }
  }
}

module.exports = new OrderController()
