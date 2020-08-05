const User = require('./user')
const Item = require('./item')
//const Order = require('/order')

// Adding Associations
// User.belongsTo(Order)
// Order.belongsTo(User)
//Important: through table name is Order_Content, it shows all the items in that particular order.
// Order.belongsToMany(Item, {through: 'Order_Content'})
// const Cart = require('./cart')

// Adding Associations
// User.belongsTo(Cart)
// Cart.hasMany(Item)

module.exports = {
  User,
  Item
  // Order,
}
