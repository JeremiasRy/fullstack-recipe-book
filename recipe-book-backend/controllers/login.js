const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.get('/', (req, res) => {
  try {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  res.status(201).json(decodedToken)
  }
  catch (error) {
  res.json(false)
  }
})

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(passwordCheck && user)) {
    return res
      .status(401)
      .json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id

  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 240 * 60 })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = loginRouter
