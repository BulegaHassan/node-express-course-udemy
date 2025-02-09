const express = require('express')
const app = express()

const people = require('./13-router-people')
const auth = require('./14-router-auth')

// static assets
app.use(express.static('../methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/people', people)
app.use('/login', auth)
const port = 5000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})
