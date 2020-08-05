const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    totalPrice: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0
    },
    status: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['pending', 'complete']]
      }
    }
  },
  {
    hooks: {
      beforeValidate(order) {
        order.status = 'pending'
      }
    }
  }
)

module.exports = Order
