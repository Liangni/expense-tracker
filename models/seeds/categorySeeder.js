if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')

const collection = [
  { name: '家居物業', iconClass: 'fas fa-home' },
  { name: '交通出行', iconClass: 'fas fa-shuttle-van' },
  { name: '休閒娛樂', iconClass: 'fas fa-grin-beam' },
  { name: '餐飲食品', iconClass: 'fas fa-utensils' },
  { name: '其他', iconClass: 'fas fa-pen' }
]

db.once('open', () => {
  Promise.all(Array.from(
    { length: 5 }, (_, i) =>
      Category.create({ 
        name: collection[i].name,
        iconClass: collection[i].iconClass
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})
