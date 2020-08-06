'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Item} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {OrderContent} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'smith',
      email: 'cody@email.com',
      password: '123',
      address: '123 10th St, Ny Ny 11249'
    }),
    User.create({
      firstName: 'sally',
      lastName: 'murphy',
      email: 'murphy@email.com',
      password: '123',
      address: '312 20th St, Ny Ny 11249'
    })
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Music Shirt',
      price: 10,
      size: 'M',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      size: 'S',
      color: 'red',
      category: 'short sleeve',
      imageUrl:
        'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      category: 'long sleeve',
      color: 'red',
      size: 'M',
      imageUrl:
        'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      category: 'long sleeve',
      color: 'red',
      size: 'L',
      imageUrl:
        'https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${items.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
