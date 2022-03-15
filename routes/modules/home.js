const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')



router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  let recordData
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => {
      recordData = records.map(record => {
        totalAmount += record.amount
        return {
          ...record,
          date: record.date.toLocaleDateString()
        }
      })
      return Category.find().lean()
    })
    .then(categories => { res.render('index', { records: recordData, totalAmount, categories }) })
    .catch(err => console.log(err))
})

router.get('/filter/:category', (req, res) => {
  const userId = req.user._id
  const categoryFilter = req.params.category
  let totalAmount = 0
  Category.findOne({ name: categoryFilter })
    .then(category => {
      Record.find({ categoryId: category._id, userId })
        .lean()
        .then(records => {
          totalAmount = 0
          records.forEach(record => {
            record.category = categoryFilter
            record.date = record.date.toLocaleDateString()
            totalAmount += record.amount
          })
          res.render('index', { records, totalAmount })
        })
    })
    .catch(err => console.log(err))
})

module.exports = router
