const Addr = require('../model/addr.model')

class AddrServer {
  async createAddr(addr) {
    return await Addr.create(addr)
  }

  async findAllAddr(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = parseInt(pageSize)
    const { count, rows } = await Addr.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default']
    })

    return {
      page,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateAddr(id, addr) {
    const res = await Addr.update(addr, {
      where: {
        id
      }
    })

    return res
  }

  async removeAddr(id) {
    const res = await Addr.destroy({ where: { id } })

    return res
  }

  async setDefaultAddr(user_id, id) {
    await Addr.update({ is_default: false }, { where: { user_id } })
    const res = await Addr.update({ is_default: true }, { where: { id } })

    return res
  }
}

module.exports = new AddrServer()
