const express = require('express')
const ejs = require('ejs')

const app = express()
const port = process.env.PORT || 3000

const date = require(__dirname + '/date.js')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

const items = ['Wake Up', 'Exercise', 'Have Breakfast']
const workItems = ['Open System', 'Check Mails']

app.get('/', (req, res) => {
  let day = date.getDate()
  res.render('list', {
    title: 'Personal List',
    path: '/work',
    toggle: 'off',
    date: day,
    newListItems: items,
  })
})

app.post('/', function (req, res) {
  let item = req.body.newItem

  if (req.body.list === 'Work List') {
    workItems.push(item)
    res.redirect('/work')
  } else {
    items.push(item)
    res.redirect('/')
  }
})

app.get('/work', (req, res) => {
  let day = date.getDate()
  res.render('list', {
    title: 'Work List',
    path: '/',
    toggle: 'on',
    date: day,
    newListItems: workItems,
  })
})

app.post('/work', function (req, res) {
  let workItem = req.body.newItem
  workItems.push(workItem)
  res.redirect('/work')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})
