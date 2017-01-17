var express = require('express')
var exLayouts = require('express-ejs-layouts')
var app = express()
var port = 8081
var router = require('./app/routes')
var scraper = require('./scraper.js')

app.set('view engine', 'ejs')
app.use(exLayouts)

app.use('/', scraper)
//app.use('/', router)

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
    console.log('app started')
}).on('error', err => {
    console.log('It was serve.js')
})