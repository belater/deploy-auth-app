if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const path = require('path')

const errorHandler = require('./middlewares/errorHandler')
const Controller = require("./controllers/controller")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('docs'))

const swaggerUI = require('swagger-ui-express')
  swaggerDocument = require(path.join(__dirname, 'docs', 'swagger.json'))

app.options('*', cors())

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.get('/validate-token/:token', Controller.validateToken)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get("/", (req, res, next) => {
  res.send("Auth API Running Successfully")
})
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})