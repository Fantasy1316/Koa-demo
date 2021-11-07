const path = require('path')
const {
  uploadFileError,
  publishGoodsError,
  invalidGoodsId,
  updateGoodsError,
  removeGoodsError,
  restoreGoodsError,
  findGoodsError
} = require('../constant/err.constant')
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods
} = require('../service/goods.server.js')

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    if (file) {
      ctx.body = {
        code: 0,
        data: {
          goods_img: path.basename(file.path)
        },
        message: '图片上传成功'
      }
    } else {
      console.error('图片上传失败：', file)
      ctx.app.emit('error', uploadFileError, ctx)
    }
  }

  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      )
      ctx.body = {
        code: 0,
        data: res,
        message: '发布商品成功'
      }
    } catch (error) {
      console.error('发布商品失败', error)
      ctx.app.emit('error', publishGoodsError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.request.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: '0',
          data: null,
          message: '更新商品成功'
        }
      } else {
        console.error('商品不存在:', ctx.request.params.id)
        ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error('更新商品失败:', error)
      ctx.app.emit('error', updateGoodsError, ctx)
    }
  }

  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.request.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          data: null,
          message: '下架商品成功'
        }
      } else {
        console.error('商品不存在:', ctx.request.params.id)
        ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error('下架商品失败:', ctx.request.params.id)
      ctx.app.emit('error', removeGoodsError, ctx)
    }
  }

  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.request.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          data: null,
          message: '上架商品成功'
        }
      } else {
        console.error('商品不存在:', ctx.request.params.id)
        ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error('上架商品失败:', ctx.request.params.id)
      ctx.app.emit('error', restoreGoodsError, ctx)
    }
  }

  async findAll(ctx, next) {
    try {
      const { page = 1, pageSize = 10 } = ctx.request.query
      const res = await findGoods(page, pageSize)

      ctx.body = {
        code: '0',
        data: res,
        message: '获取商品列表成功'
      }
    } catch (error) {
      console.error('获取商品列表失败：', error)
      ctx.app.emit('error', findGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
