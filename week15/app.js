const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/jobs', require('./routes/public/jobs'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/public/index'))
app.use('/jobs', require('./routes/public/jobs'))

module.exports = app
