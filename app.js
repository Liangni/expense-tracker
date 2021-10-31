const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser=require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/record')
const Category = require('./models/category')
const routes = require('./routes')

const PORT = 3000

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
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}!`)
})