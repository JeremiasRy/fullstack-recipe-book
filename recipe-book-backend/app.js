const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static('build'))

app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)
app.use(middleware.tokenGetter)

const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const recipeRouter = require('./controllers/recipes')

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/recipes', recipeRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
