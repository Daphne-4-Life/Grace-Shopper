const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  // empty string validation needed for name
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: 'T-Shirt'
  },
  size: {
    type: Sequelize.ENUM('sm', 'med', 'lg')
  }
})

module.exports = Item
