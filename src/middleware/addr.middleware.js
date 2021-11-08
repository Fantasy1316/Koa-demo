const { addrFormatError } = require('../constant/err.constant')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.error('添加地址失败：,', error)
      addrFormatError.data = error
      ctx.app.emit('error', addrFormatError, ctx)
      return
    }

    await next()
  }
}

module.exports = {
  validator
}
