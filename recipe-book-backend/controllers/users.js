const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('recipes', { id: 1 })
  res.json(users.map(user => user.toJSON()))
})
userRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
  res.json(user)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const uniqueUser = await User.findOne({ username })
  if (uniqueUser) {
    return res
      .status(400)
      .json({ error: 'username already used' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    recipes: []
  })

  const savedUser = await user
    .save()
  res
    .status(201)
    .json(savedUser)
})

module.exports = userRouter
