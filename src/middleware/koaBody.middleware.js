const KoaBody = require('koa-body')

const koaBody = async (ctx, next) => {
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true
    }
  })

  await next()
}

module.exports = {
  koaBody
}
