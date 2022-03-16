const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('edit', { categories }))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  if (!name || !date || !categoryId || !amount) throw new Error('使用者有未填欄位!')
  return Record.create({
    name,
    date,
    categoryId,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let recordData
  return Record.findOne({ _id, userId }).lean()
    .then(record => {
      recordData = { 
        ...record,
        categoryId: record.categoryId.toString(), //將ObjectId轉成字串才能在前端樣板進行ifCond的比較
        date: record.date.toISOString().slice(0, 10)
      }
      return Category.find().lean()
    })
    .then(categories => { 
      res.render('edit', { record: recordData, categories })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      return Category.findOne({ name: category })
        .then(category => {
          record.name = name
          record.date = date
          record.categoryId = category._id
          record.amount = amount
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
