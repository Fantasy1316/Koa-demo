const Goods = require('../model/goods.model')

class GoodsServer {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }
}

module.exports = new GoodsServer()
