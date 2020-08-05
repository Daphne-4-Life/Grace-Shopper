const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    //Can this be an empty string?
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    //Minimum value validation?
  },
  quantity: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 0,
    //Minimum value validation?
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg',
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'T-Shirt',
    //Why does this need to be text?
  },
  size: {
    type: Sequelize.ENUM('sm', 'med', 'lg'),
  },
  available: {
    //Why is this field needed?
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Item
