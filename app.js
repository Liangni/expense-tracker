const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser=require('body-parser')

const Record = require('./models/record')
const Category = require('./models/category')

const PORT = 3000
const CATEGORY = {
  家居物業: 'fas fa-home',
  交通出行: 'fas fa-shuttle-van',
  休閒娛樂: 'fas fa-grin-beam',
  餐飲食品: 'fas fa-utensils',
  其他: 'fas fa-pen',
}
let totalAmount
const app = express()


require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    getIcon: function (name, iconSource) {
      return iconSource[name]
    },
    isCategory: function (recordCategory, selectOption) {
      return recordCategory === selectOption
    }
  }
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/', (req, res) => {
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

app.post('/', (req, res) => {
  const {name, date, category, amount} = req.body
  Category.findOne({ name: category})
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

app.get('/records/:id/edit', (req, res) => {
  recordId = req.params.id
  return Record.findById(recordId)
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .then(categories => {
          const recordCategory = categories.find(category => category._id.equals(record.categoryId))
          record.category = recordCategory.name
          record.date = record.date.toISOString().slice(0,10)
          res.render('edit', { record })
        })
    })
    .catch(err => console.log(err))
})

app.post('/records/:id/edit',(req, res) => {
  const recordId = req.params.id
  const { name, date, category, amount} = req.body
  return Record.findById(recordId)
    .then(record => {
      return Category.findOne({name: category})
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

app.post('/records/:id/delete', (req, res) => {
  recordId = req.params.id
  return Record.findById(recordId)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/filter/:category', (req, res) => {
  const categoryFilter = req.params.category
  Category.findOne({name: categoryFilter})
    .then(category => {
      Record.find({categoryId: category._id})
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

app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}!`)
})