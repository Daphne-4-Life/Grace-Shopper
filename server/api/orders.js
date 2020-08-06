const router = require('express').Router()
const {Order} = require('../db/models')
const {OrderContent} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll(req.body)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

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

router.post('/', async (req, res, next) => {
  try {
    const addOrder = await Order.create(req.body)
    res.json(addOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      include: {
        model: OrderContent
      },
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    const updatedOrder = await order.update(req.body)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
