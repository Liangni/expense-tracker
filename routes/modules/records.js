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

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category })
    .then(category => {
      Record.create({
        name,
        date,
        categoryId: category._id,
        amount
      })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  recordId = req.params.id
  return Record.findById(recordId)
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .then(categories => {
          const recordCategory = categories.find(category => category._id.equals(record.categoryId))
          record.category = recordCategory.name
          record.date = record.date.toISOString().slice(0, 10)
          res.render('edit', { record })
        })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const recordId = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(recordId)
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
  recordId = req.params.id
  return Record.findById(recordId)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router