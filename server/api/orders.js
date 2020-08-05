const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll(req.body)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const orderId = await Order.findByPk(req.params.id)
    res.json(orderId)
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

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const updatedOrder = await order.update(req.body)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteOrder = await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deleteOrder)
  } catch (error) {
    next(error)
  }
})
