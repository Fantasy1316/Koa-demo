const {
  createAddr,
  findAllAddr,
  updateAddr,
  removeAddr,
  setDefaultAddr
} = require('../service/addr.server')

class AddrController {
  async create(ctx) {
    const { id: user_id } = ctx.state.user
    const { consignee, phone, address } = ctx.request.body

    const res = await createAddr({ user_id, consignee, phone, address })

    ctx.body = {
      code: 0,
      data: res,
      message: '添加地址成功'
    }
  }

  async findAll(ctx) {
    const { page = 1, pageSize = 10 } = ctx.request.query

    const res = await findAllAddr(page, pageSize)

    ctx.body = {
      code: 0,
      data: res,
      message: '获取地址列表成功'
    }
  }

  async update(ctx) {
    const { id } = ctx.request.params
    const addr = ctx.request.body

    const res = await updateAddr(id, addr)

    ctx.body = {
      code: 0,
      data: res,
      message: '更新地址成功'
    }
  }

  async remove(ctx) {
    const { id } = ctx.request.params

    const res = await removeAddr(id)

    ctx.body = {
      code: 0,
      data: res,
      message: '删除地址成功'
    }
  }

  async setDefault(ctx) {
    const { id: user_id } = ctx.state.user
    const { id } = ctx.request.params

    const res = await setDefaultAddr(user_id, id)

    ctx.body = {
      code: 0,
      data: res,
      message: '设置默认地址成功'
    }
  }
}

module.exports = new AddrController()
