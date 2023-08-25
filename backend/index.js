require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

const user = require('./user/routes');
app.use('/user', user)

const job = require('./job/routes');
app.use('/job', job)

app.get('/', (req, res, next) => {
  res.send('It works')
})

app.listen(port, () => {
  console.log(`run on http://localhost:${port}`)
})