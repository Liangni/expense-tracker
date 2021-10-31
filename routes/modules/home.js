const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const CATEGORY = {
  家居物業: 'fas fa-home',
  交通出行: 'fas fa-shuttle-van',
  休閒娛樂: 'fas fa-grin-beam',
  餐飲食品: 'fas fa-utensils',
  其他: 'fas fa-pen',
}
let totalAmount

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          totalAmount = 0
          records.forEach(record => {
            const recordCategory = categories.find(category => category._id.equals(record.categoryId))
            record.category = recordCategory.name
            record.date = record.date.toLocaleDateString()
            totalAmount += record.amount
          })
          res.render('index', { records, CATEGORY, totalAmount })
        })
    })
    .catch(err => console.log(err))
})

router.get('/filter/:category', (req, res) => {
  const categoryFilter = req.params.category
  Category.findOne({ name: categoryFilter })
    .then(category => {
      Record.find({ categoryId: category._id })
        .lean()
        .then(records => {
          totalAmount = 0
          records.map(record => {
            record.category = categoryFilter
            record.date = record.date.toLocaleDateString()
            totalAmount += record.amount
          })
          res.render('index', { records, CATEGORY, totalAmount })
        })
    })
    .catch(err => console.log(err))
})


module.exports = router
