const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    totalPrice: {
      type: Sequelize.FLOAT,
      //Your item price is an integer, why is this a float?
      allowNull: true,
      defaultValue: 0.0,
    },
    status: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['pending', 'complete']],
        // Like enum?
      },
    },
  },
  {
    hooks: {
      beforeValidate(order) {
        // vs default value?
        order.status = 'pending'
      },
    },
  }
)

module.exports = Order
