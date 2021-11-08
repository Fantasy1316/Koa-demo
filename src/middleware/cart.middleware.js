const { cartFormatError } = require('../constant/err.constant')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.error('添加购物车失败', error)
      cartFormatError.data = error
      ctx.app.emit('error', cartFormatError, ctx)
      return
    }

    await next()
  }
}

module.exports = {
  validator
}
