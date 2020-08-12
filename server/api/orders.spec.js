/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders', () => {
    Order.create()
  })

  it('GET /api/orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].status).to.be.equal('pending')
    expect(res.body[0].totalPrice).to.be.equal(0)
  })
})
