const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {

  Promise.all(Array.from(
    { length: 5 }, (_, i) =>
    Category.create({ name: `category-${i}`})
  ))
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(err => console.log(err))
})