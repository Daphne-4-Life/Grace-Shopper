const Sequelize = require('sequelize')
const db = require('../db')

const OrderContent = db.define('OrderContent', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  color: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.STRING
  }
})
module.exports = OrderContent
