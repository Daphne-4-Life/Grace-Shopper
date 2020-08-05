const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
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
    type: Sequelize.ENUM('sm', 'med', 'lg')
  },
  color: {
    type: Sequelize.ENUM('black', 'white', 'red', 'orange', 'blue')
  },
  available: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Item
