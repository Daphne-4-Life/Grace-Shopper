const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  //See comments from first code review
  //Add inventory?
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
    type: Sequelize.TEXT,
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
    type: Sequelize.TEXT,
    defaultValue: 'T-Shirt'
  },
  size: {
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL')
  },
  color: {
    type: Sequelize.ENUM('black', 'white', 'red', 'orange', 'blue')
  },
  category: {
    type: Sequelize.ENUM('long sleeve', 'short sleeve'),
    allowNull: false
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Item
