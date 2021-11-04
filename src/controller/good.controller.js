const path = require('path')
const { uploadFileError } = require('../constant/err.constant')

class GoodController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    if (file) {
      ctx.body = {
        code: 0,
        data: {
          good_img: path.basename(file.path)
        },
        message: '图片上传成功'
      }
    } else {
      console.error('图片上传失败：', file)
      ctx.app.emit('error', uploadFileError, ctx)
    }
  }
}

module.exports = new GoodController()
