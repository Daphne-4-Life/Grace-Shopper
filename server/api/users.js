const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

//Routes on the root
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll(
      {
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      },
      {include: Order}
    )
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      email,
      password,
      googleId,
      isAdmin,
      address,
      imageUrl,
      firstName,
      lastName
    } = req.body
    const user = await User.create({
      email,
      password,
      googleId,
      isAdmin,
      address,
      imageUrl,
      firstName,
      lastName
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//Routes for specific user id
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne(
      {include: Order},
      {
        where: {id: req.params.userId},
        attributes: [
          'id',
          'email',
          'address',
          'imageUrl',
          'firstName',
          'lastName'
        ]
      }
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//Routes for specific user id
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findOne(
      {
        include: {
          model: Order,
          where: {
            status: 'pending'
          }
        }
      },
      {
        where: {id: req.params.userId},
        attributes: [
          'id',
          'email',
          'address',
          'imageUrl',
          'firstName',
          'lastName'
        ]
      }
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.id)
    if (user) {
      await user.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const {updatedFields} = req.body
    const user = await User.update(
      {...updatedFields},
      {where: {id: req.params.userId}}
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})
