const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')

const SEED_CATEGORY = { name: '家居物業' }

db.once('open', () =>
  Category.findOne({ name: SEED_CATEGORY.name})
    .then((category) =>
      Promise.all(Array.from(
        { length: 5 }, 
        (_, i) => Record.create({
          name: `expense-${i}`,
          date: Date.now(),
          amount: 100 + i,
          categoryId: category._id
        })
      ))
    )
    .then(() => {
      console.log('done!')
      process.exit()
    })
)

