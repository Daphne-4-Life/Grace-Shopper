/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

const User = db.model('user')

describe('User routes', () => {

const Item = db.model('item')

describe('item routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })


  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

  describe('/api/items/', () => {
    const musicShirt = 'Music Shirt'

    beforeEach(() => {
      return Item.create({
        name: musicShirt
      })
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(musicShirt)
    })
  })
})

