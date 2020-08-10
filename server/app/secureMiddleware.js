const User = require('../db/models/')

const isAdminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error("you're not an admin!")
    err.status = 401
    next(err)
  } else {
    next()
  }
}

const isLoggedInMiddleware = (req, res, next) => {
  if (!req.user) {
    const err = new Error('no access!')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

module.exports = {
  isAdminMiddleware,
  isLoggedInMiddleware
}
