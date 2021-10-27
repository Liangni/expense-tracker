const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  
  Promise.all(Array.from(
    { length: 10 }, (_, i) => {
      Record.create({
        name: `expense-${i}`,
        date: Date.now(),
        amount: 100 + i
      })
    }
  ))
    .then(() => {
      console.log('done!')
      // process.exit() 加入此行就無法產生種子資料
    })
    .catch(err => console.log(err))
})
