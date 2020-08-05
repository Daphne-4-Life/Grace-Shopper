const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20
  },

  quantity: {

  inventory: {

    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue:
      'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
  },
  description: {
    type: Sequelize.STRING,

    defaultValue: 'T-Shirt'
  },
  size: {
    type: Sequelize.ENUM('sm', 'med', 'lg')

    defaultValue: 'Our shirts are handmade, comfortable and long lasting.'
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
