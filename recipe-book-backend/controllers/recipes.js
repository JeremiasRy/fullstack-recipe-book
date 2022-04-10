const recipeRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const middleware = require('../utils/middleware')

recipeRouter.get('/', async (req, res) => {
  const recipes = await Recipe
    .find({})
    .populate('user', { id: 1, name: 1 })
  res.json(recipes.map(r => r.toJSON()))
})
recipeRouter.get('/:id', async (req, res) => {
  const recipe = await Recipe
    .findById(req.params.id)
  res.json(recipe)
})

recipeRouter.post('/', async (req, res) => {
  const decodedToken = jwt
    .verify(req.token, process.env.SECRET)

  const user = await User
    .findById(decodedToken.id)

  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    user: user.id,
    method: req.body.method
  })

  const savedRecipe = await recipe.save()
  user.recipes.push(savedRecipe.id)
  user.save()

  res.status(200).json(savedRecipe)
})

recipeRouter.put('/:id', middleware.userGetter, async (req, res) => {
  const recipeCheck = await Recipe
    .findById(req.params.id)
  if (recipeCheck.user.toString() === req.user._id.toString()) {
    const recipe = await Recipe
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res
      .status(200)
      .json(recipe)
  }
  res
    .status(401)
    .json({ error: 'You are not allowed to edit this' })
})

recipeRouter.delete('/:id', middleware.userGetter, async (req, res) => {
  const recipeCheck = await Recipe
    .findById(req.params.id)

  if (!recipeCheck) {
    return res
      .status(400)
      .json({ error: 'Removed already or does not exist' })
  }

  if (recipeCheck.user.toString() === req.user._id.toString()) {
    const remove = await Recipe
      .findByIdAndDelete(req.params.id)
    return res
      .status(200)
      .json(remove)
  }

  res
    .status(401)
    .json({ error: 'You are not alowed to remove this' })
})

module.exports = recipeRouter
