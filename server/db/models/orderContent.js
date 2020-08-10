const Sequelize = require('sequelize')
const db = require('../db')

const OrderContent = db.define('OrderContent', {
  //Perhaps include price at time of purchase? Would be handy for order history.
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0 //Add minimum validation
  },
  color: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.STRING //Why not enum?
  }
})
module.exports = OrderContent
