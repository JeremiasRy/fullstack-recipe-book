const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.connect(config.mongoUrl)

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{
    name: String,
    amount: Number,
    unit: String
  }],
  method: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    if (returnedObject.ingredients) {
      returnedObject.ingredients.forEach(i => delete i._id)
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Recipe', recipeSchema)
