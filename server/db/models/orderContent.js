const Sequelize = require('sequelize')
const db = require('../db')

const OrderContent = db.define('Order_Content', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
module.exports = OrderContent
