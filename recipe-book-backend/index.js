const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('connected')
  })
  .catch(() => {
    console.log('failed to connect')
  })

const server = http.createServer(app)
const port = config.port

server.listen(port, () => {
  console.log(`server running on port ${port}`)
})
