const Sequelize = require('sequelize')
const db = require('../db')

const OrderContent = db.define('OrderContent', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

//store historic price - price of specific item

OrderContent.prototype.updateQuantity = function(quantity) {
  return this.update({quantity: quantity})
}
module.exports = OrderContent
