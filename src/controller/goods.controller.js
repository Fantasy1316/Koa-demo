const path = require('path')
const {
  uploadFileError,
  publishGoodsError
} = require('../constant/err.constant')
const { createGoods } = require('../service/goods.server.js')

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
      console.error('发布商品失败', error)
      ctx.app.emit('error', publishGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
