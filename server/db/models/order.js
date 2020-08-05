const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define(
  'order',
  {
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    //consider ENUM
    status: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['pending', 'complete']]
      }
    }
  },
  {
    // can set default value instead
    // can add validations for negative values on inventory and price
    hooks: {
      beforeValidate(order) {
        order.status = 'pending'
      }
    }
const Order = db.define('order', {
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
