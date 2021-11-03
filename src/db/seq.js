const { Sequelize } = require('sequelize')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
})

// 测试数据库是否链接成功
// seq
//   .authenticate()
//   .then(() => {
//     console.log('Mysql connect success')
//   })
//   .catch((err) => {
//     console.log('Mysql connect fail: ', err)
//   })

module.exports = seq
