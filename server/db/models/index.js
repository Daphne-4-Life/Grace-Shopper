const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const OrderContent = require('./orderContent')

// Adding Associations
Order.belongsTo(User)
User.hasMany(Order)

//Important: through table name is OrderContent, it shows all the items in that particular order.
Order.belongsToMany(Item, {through: OrderContent})

module.exports = {
  User,
  Item,
  Order
}
