const router = require('express').Router()
const {Item} = require('../db/models')


// GET items default

// GET all items

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// GET all longsleeve items
router.get('/longSleeve', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        category: 'long sleeve'
      }
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// GET all shortleeve items
router.get('/shortSleeve', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        category: 'short sleeve'
      }
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// GET singleItem
router.get('/changeSingleItem', async (req, res, next) => {
  const name = req.query.name
  const color = req.query.color
  const size = req.query.size

  try {
    const item = await Item.findAll({
      where: {
        name: name,
        color: color,
        size: size
      }
    })
    res.send(item)
  } catch (error) {
    next(error)
  }
})

// GET item by id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id)
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
    await deleteItem.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
