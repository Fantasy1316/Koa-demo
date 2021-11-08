const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Goods = require('./goods.model')

const Cart = seq.define('demo_carts', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品ID'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量'
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '商品是否选中'
  }
})

// Cart.sync({ force: true })

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info'
})

module.exports = Cart
