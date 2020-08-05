const User = require('./user')
const Order = require('./order')
const Item = require('./item')

// Adding Associations
Order.belongsTo(User)
User.hasMany(Order)

//Important: through table name is Order_Content, it shows all the items in that particular order.
Order.belongsToMany(Item, {through: 'Order_Content'})

module.exports = {
  User,
  Item,
  Order
}

