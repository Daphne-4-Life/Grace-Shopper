const router = require('express').Router()
const {User, Order, Item, OrderContent} = require('../db/models')
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
      include: {model: Item},
      where: {
        userId: req.params.userId,
        status: 'complete'
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
    const userOrders = await Order.findOrCreate({
      include: {model: Item},
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    console.log(userOrders)
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

//Editing cart
router.put('/:orderId/cart/:itemId', async (req, res, next) => {
  try {
    let {quantity, totalPrice, colorSelection, sizeSelection} = req.body

    await Order.findOne({
      where: {
        id: req.params.orderId
      }
    })
      .then(order => order.update({totalPrice: totalPrice}))
      .catch(next)

    // const updatedOrderContent = await OrderContent.findOrCreate({
    //   where: {
    //     orderId: req.params.orderId,
    //     itemId: req.params.itemId,
    //     color: colorSelection,
    //     size: sizeSelection,
    //   },
    // })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
