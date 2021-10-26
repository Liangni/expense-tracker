const express = require('express')


const PORT = 3000

const app = express()

require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('This is my expense-tracker project.')
})

app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}!`)
})