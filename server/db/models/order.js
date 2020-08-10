const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  //See comments from first code review
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: 0.0
  },
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  }
})

module.exports = Order
