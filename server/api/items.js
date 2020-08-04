const router = require('express').Router()
const {Item} = require('../db/models')

// GET items default
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// GET item by id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (!item) {
      const error = Error(`Sorry, item ID: ${item} was not found`)
      error.status = 404
      return next(error)
    }
    res.send(item)
  } catch (error) {
    next(error)
  }
})

// POST new item
router.post('/', async (req, res, next) => {
  try {
    const addItem = await Item.create(req.body)
    res.status(201).send(addItem)
  } catch (error) {
    next(error)
  }
})

// PUT new item data
router.put('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
    const updateItem = await item.update(req.body)
    res.json(updateItem)
  } catch (error) {
    next(error)
  }
})

// DELETE item
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteItem = await Item.findByPk(req.params.id)
    if (!deleteItem) {
      const error = new Error(`Sorry, item ID: ${deleteItem} was not found`)
      error.status = 404
      return next(error)
    }
    await deleteItem.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
