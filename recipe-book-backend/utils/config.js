require('dotenv').config()

const mongoUrl = process.env.MONGO_URI
const port = process.env.PORT

module.exports = { mongoUrl, port }
