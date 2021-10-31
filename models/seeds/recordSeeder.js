const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const SEED_CATEGORY = { name: '家居物業' }
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () =>
  Category.findOne({ name: SEED_CATEGORY.name })
    .then((category) =>
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          const categoryId = category._id
          const userId = user._id
          return Promise.all(Array.from(
            { length: 5 },
            (_, i) => Record.create({
              name: `expense-${i}`,
              date: Date.now(),
              amount: 100 + i,
              categoryId,
              userId
            })
          ))
        })
    )
    .then(() => {
      console.log('done!')
      process.exit()
    })
)

