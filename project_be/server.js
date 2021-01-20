const express = require('express')
const bodyParser = require('body-parser')
const projectRouter = require('./routers/projectrouter')

const app = express()


app.use((req, res, next) => {
  // res.status(401).json({ message: 'no one is allowed' })
  console.log(`${req.method} ${req.url}`)
  next()
})


app.use(bodyParser.json())

app.use('/api', projectRouter)

app.listen(8080)