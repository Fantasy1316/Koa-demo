const { goodsFormatError } = require('../constant/err.constant')

const validator = async (ctx, next) => {
  console.log(ctx.request.body)
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true }
    })
  } catch (error) {
    console.error('发布商品参数错误', error)
    goodsFormatError.data = error
    ctx.app.emit('error', goodsFormatError, ctx)
    return
  }

  await next()
}

module.exports = {
  validator
}
