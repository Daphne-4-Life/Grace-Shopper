'use strict'

const db = require('../server/db')
const {User, OrderContent} = require('../server/db/models')
const {Item} = require('../server/db/models')
const {Order} = require('../server/db/models')
//const {OrderContent} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'jonah',
      lastName: 'hill',
      email: 'cody@email.com',
      password: '123',
      address: '123 10th St, Ny Ny 11249',
      imageUrl:
        'https://images.ladbible.com/thumbnail?type=jpeg&url=https://www.unilad.co.uk/wp-content/uploads/2018/06/jonah-hill-has-pink-hair-web.jpg&quality=70&height=700'
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
    //blue music shirt
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),

    //white music shirt
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),

    //black music shirt
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),

    //red music shirt
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'red',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'M',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'L',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XL',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XXL',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),

    //orange music shirt
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'orange',
      category: 'short sleeve',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'M',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'L',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'XL',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),
    Item.create({
      name: 'Music Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      size: 'XXL',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1LgAfHVXXXXa0XVXXq6xXFXXXx/Nice-New-Arrival-The-Music-Note-G-Men-s-t-shirt-O-Neck-Cheap-Price-man.jpg'
    }),

    //athletic shirt
    //blue atheletic shirt
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),

    //white Athletic shirt
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),

    //black Athletic shirt
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),

    //red Athletic shirt
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'red',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'M',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'L',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XL',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XXL',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),

    //orange Athletic shirt
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'orange',
      category: 'short sleeve',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'M',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'L',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'XL',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),
    Item.create({
      name: 'Athletic Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      size: 'XXL',
      imageUrl:
        'http://stylesatlife.com/wp-content/uploads/2018/02/Designer-sports-T-shirts.jpg'
    }),

    //pet shirt
    //blue pet shirt
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),

    //white Pet shirt
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),

    //black Pet shirt
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),

    //red Pet shirt
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'red',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'M',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'L',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XL',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XXL',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),

    //orange Pet shirt
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'orange',
      category: 'short sleeve',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'M',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'L',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'XL',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),
    Item.create({
      name: 'Pet Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      size: 'XXL',
      imageUrl:
        'https://iheartdogs.com/wp-content/uploads/2014/06/4-Legged-Word.jpg'
    }),

    //custom shirt
    //blue Custom shirt
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'blue',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),

    //white Custom shirt
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'white',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),

    //black Custom shirt
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'M',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'L',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'XXL',
      color: 'black',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),

    //red Custom shirt
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'red',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'M',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'L',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XL',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'red',
      size: 'XXL',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),

    //orange Custom shirt
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      size: 'S',
      color: 'orange',
      category: 'short sleeve',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'M',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'L',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      color: 'orange',
      size: 'XL',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    }),
    Item.create({
      name: 'Custom Shirt',
      price: 10,
      quantity: 50,
      category: 'long sleeve',
      size: 'XXL',
      imageUrl:
        'http://shirtboss.com/1442-thickbox_default/personalized-classic-custom-old-english-t-shirt.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create({totalPrice: 100}),
    Order.create({totalPrice: 200, status: 'complete'}),
    Order.create({totalPrice: 300, status: 'complete'})
  ])

  await orders[0].addItem(items[0])
  await orders[0].addItem(items[1])
  await orders[1].addItem(items[2])
  await orders[2].addItem(items[3])
  await orders[0].setUser(users[0])
  await orders[1].setUser(users[0])
  await orders[2].setUser(users[0])

  const allOrderContents = await OrderContent.findAll()
  await allOrderContents[0].update({quantity: 10})
  await allOrderContents[1].update({quantity: 10})
  await allOrderContents[2].update({quantity: 20})
  await allOrderContents[3].update({quantity: 20})

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${items.length} items`)
  console.log(`seeded ${orders.length} orders`)
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
