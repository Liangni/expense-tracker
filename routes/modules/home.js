const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')



router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId || ''
  let totalAmount = 0
  let recordData
  Record.find(categoryId ? { userId, categoryId } : { userId })
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
    .then(categories => { res.render('index', { records: recordData, totalAmount, categories, categoryId }) })
    .catch(err => console.log(err))
})


module.exports = router
