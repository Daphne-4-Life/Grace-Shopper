const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.userId},
      attributes: [
        'id',
        'email',
        'address',
        'imageUrl',
        'firstName',
        'lastName'
      ]
    })
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
