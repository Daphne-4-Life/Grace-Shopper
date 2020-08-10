const Sequelize = require('sequelize')
const db = require('../db')

//add string validation
const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
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
  //negative value validation
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
  // available: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: true,
  // },
  //not necessary
})

module.exports = Item
