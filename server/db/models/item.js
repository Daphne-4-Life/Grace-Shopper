const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
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
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL')
  },
  color: {
    type: Sequelize.ENUM('black', 'white', 'red', 'orange', 'blue')
  },
  category: {
    type: Sequelize.ENUM('long sleeve', 'short sleeve'),
    allowNull: false
  }
})

module.exports = Item
