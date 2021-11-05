const Goods = require('../model/goods.model')

class GoodsServer {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } })
    return res[0]
  }

  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } })
    return res
  }

  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } })
    return res
  }

  async findGoods(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = parseInt(pageSize)

    const { count, rows } = await Goods.findAndCountAll({ offset, limit })

    return {
      page,
      pageSize,
      total: count,
      list: rows
    }
  }
}

module.exports = new GoodsServer()
