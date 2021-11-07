const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class CartServer {
  async createOrUpdate (user_id, goods_id) {
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id
        }
      }
    })

    if (res) {
      await res.increment('number')
      return await res.reload()
    } else {
      return await Cart.create({
        user_id,
        goods_id
      })
    }
  }

  async findCarts (page, pageSize ) {
    const offset = (page - 1) * pageSize
    const limit = parseInt(pageSize)

    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
      }
    })

    return {
      page,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateCarts (params) {
    const { id, number, selected } = params

    const res = await Cart.findByPk(id)

    if (!res) return null

    number !== undefined ? res.number = number : ''
    selected !== undefined ? res.selected = selected : ''

    return await res.save()
  }

  async removeCarts (ids) {
    const res = await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
    return res
  }

  async selectAllCart(user_id) {
    return await Cart.update(
      { selected: true },
      {
        where: {
          user_id
        } 
      }
    )
  }

  async unSelectAllCart(user_id) {
    return await Cart.update(
      { selected: false },
      {
        where: {
          user_id
        } 
      }
    )
  }
}

module.exports = new CartServer()