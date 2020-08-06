const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderContent} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

//GET ALL ORDERS (IN CASE WE EVER NEED IT)
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll(req.body)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//GET ALL PREVIOUS ORDERS
router.get('/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

//GET CURRENT PENDING ORDER
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

//CREATES A NEW ORDER
router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Order.create()
    const user = await User.findByPk(req.params.userId)
    newOrder.setParent(user)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//COMPLETES THE CURRENT ORDER
router.put('/:userId/cart/complete', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    const completedOrder = await order.update({status: 'complete'})
    res.json(completedOrder)
  } catch (error) {
    next(error)
  }
})

//EDITS THE CART THROUGH ORDER_CONTENT BASED ON ITEM CHOSEN TO UPDATE AND ORDERID
router.put('/:userId/cart/:itemId', async (req, res, next) => {
  try {
    const {quantity, price, color, size} = req.body
    const order = await Order.findOne({
      include: {
        model: OrderContent
      },
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    const orderId = order.id
    const orderContent = OrderContent.findOne({
      where: {
        orderId,
        itemId: req.params.itemId
      }
    })
    const updatedOrderContent = await orderContent.update({
      quantity,
      price,
      color,
      size
    })
    const totalPrice = updatedOrderContent.price * updatedOrderContent.quantity
    const updatedOrder = await order.update({totalPrice})
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
