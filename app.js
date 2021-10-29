const express = require('express')
const exphbs = require('express-handlebars')
const category = require('./models/category')

const Record = require('./models/record')
// const Category = require('./models/category')

const PORT = 3000
const CATEGORY = {
  家居物業: 'fas fa-home',
  交通出行: 'fas fa- shuttle',
  休閒娛樂: 'fas fa-grin-beam',
  餐飲食品: 'fas fa-utensils',
  其他: 'fas fa-pen',
}
let totalAmount = 0
const app = express()


require('./config/mongoose')

app.engine('hbs', exphbs({ 
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    getIcon: function (name, iconSource) { 
      return iconSource[name]
    },
  }
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      category.find()
        .lean()
        .then( categories => {
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


app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}!`)
})