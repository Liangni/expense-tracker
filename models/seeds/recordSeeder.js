const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  
  Promise.all(Array.from(
    { length: 10 }, (_, i) => {
      return Record.create({
        name: `expense-${i}`,
        date: Date.now(),
        amount: 100 + i
      })
    }
  ))
  .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.log(err))
})
