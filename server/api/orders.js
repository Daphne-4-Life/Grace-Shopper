const router = require('express').Router()
const {Order, Item, OrderContent} = require('../db/models')
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

//GET CURRENT PENDING ORDER OR CREATES A NEW ORDER
//include set parent here
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userOrders = await Order.findOrCreate({
      include: {model: Item},
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
    let {totalQuantity, totalPrice} = req.body

    let currentOrder = await Order.findOne({where: {id: req.params.orderId}})
    currentOrder.update({totalPrice: totalPrice})

    let newItem = await Item.findByPk(req.params.itemId)

    const updatedOrderContent = OrderContent.findOne({
      where: {
        orderId: req.params.orderId,
        itemId: req.params.itemId
      }
    })
      .then(order => {
        if (order) {
          order.update({quantity: totalQuantity})
        } else {
          currentOrder.addItem(newItem, {through: {quantity: totalQuantity}})
        }
      })
      .catch(next)

    res.json(updatedOrderContent)
  } catch (error) {
    next(error)
  }
})

//Update Order Quantity from cart
router.patch(
  '/updateItemQuantity/:orderId/item/:itemId',
  async (req, res, next) => {
    try {
      let {updatedQuantity, updatedTotalPrice} = req.body

      let currentOrder = await Order.findOne({where: {id: req.params.orderId}})
      currentOrder.update({totalPrice: updatedTotalPrice})

      const updatedOrderContent = OrderContent.findOne({
        where: {
          orderId: req.params.orderId,
          itemId: req.params.itemId
        }
      })
        .then(order => {
          if (order) {
            order.update({quantity: updatedQuantity})
          } else {
            throw Error('Order Not Found.')
          }
        })
        .catch(next)

      res.json(updatedOrderContent)
    } catch (error) {
      next(error)
    }
  }
)
