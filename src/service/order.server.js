const Order = require('../model/order.model')

class OrderServer {
  async createOrder(order) {
    try {
      const res = await Order.create(order)
      const { updatedAt, createdAt, status, ...data } = res.dataValues
      return { ...data, status }
    } catch (error) {
      console.error('创建订单记录失败：', error)
    }
  }

  async finAllOrder(page, pageSize, status) {
    const offset = (page - 1) * pageSize
    const limit = parseInt(pageSize)

    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit,
      where: {
        status
      },
      attributes: [
        'id',
        'address_id',
        'goods_info',
        'total',
        'order_number',
        'status'
      ]
    })

    return {
      page,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateOrderStatus(id, status) {
    const res = await Order.update({ status }, { where: { id } })
    return res
  }
}

module.exports = new OrderServer()
