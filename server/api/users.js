const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
const {
  isLoggedInMiddleware,
  isAdminMiddleware
} = require('../app/secureMiddleware')

module.exports = router

//GET route
router.get(
  '/',
  isLoggedInMiddleware,
  isAdminMiddleware,
  async (req, res, next) => {
    try {
      const users = await User.findAll(
        {
          attributes: ['id', 'email', 'isAdmin']
        },
        {include: Order}
      )
      res.json(users)
    } catch (err) {
      next(err)
    }
  }
)

// POST route
router.post(
  '/',
  isLoggedInMiddleware,
  isAdminMiddleware,
  async (req, res, next) => {
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
      const respondUser = {
        email: user.email,
        address: user.address,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName
      }
      res.json(respondUser)
    } catch (err) {
      next(err)
    }
  }
)

// GET route for a specific user id
router.get(
  '/:userId',
  isLoggedInMiddleware,
  isAdminMiddleware,
  async (req, res, next) => {
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
  }
)

//GET route for specific users cart
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

// DELETE route for a user
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
    console.log(updatedFields)
    const user = await User.findByPk(req.params.userId)
    await user.update({...updatedFields})
    res.json(user)
  } catch (error) {
    next(error)
  }
})
