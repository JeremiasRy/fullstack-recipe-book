import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/system/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useDispatch } from 'react-redux'
import { newRecipe } from '../reducers/recipes'
import { useState } from 'react'
import { setInfo } from '../reducers/notification'

const Recipeform = () => {
  const dispatch = useDispatch()
  const [recipeName, setRecipeName] = useState('')
  const [method, setMethod] = useState('')
  const [ingredients, setIngredients] = useState([])

  const handleNameChange = (e) => {
    e.preventDefault()
    setRecipeName(e.target.value)
  }

  const handleMethod = (e) => {
    e.preventDefault()
    setMethod(e.target.value)
  }

  const handleIngredientAdd = (e) => {
    e.preventDefault()
    const ingredientData = new FormData(e.currentTarget)

    const ingredientName = ingredientData.get('ingredient')
    const amount = ingredientData.get('amount')
    const unit = ingredientData.get('unit')

    const ingredient = {
      name: ingredientName,
      amount: Number(amount),
      unit: unit
    }

    setIngredients(ingredients.concat(ingredient))
    e.currentTarget.reset()
  }

  const addRecipe = () => {
    if (recipeName === '') {
      return dispatch(setInfo('Please give your recipe a name', 5))
    }
    if (ingredients.length === 0) {
      return dispatch(setInfo('Please put some ingredients', 5))
    }
    const recipe = {
      name: recipeName,
      ingredients: ingredients,
      method: method
    }
    setRecipeName('')
    setMethod('')
    setIngredients([])
    dispatch(newRecipe(recipe))
  }

  return (
    <div style={{ padding: '5px' }}>
      <TextField sx={{ padding: '5px' }} id='recipe' name='recipeName' label='Recipe name' value={recipeName} variant='standard' autoComplete='off' onChange={handleNameChange} /> <br />
      <List>
        {ingredients.length > 0 && ingredients.map(i => <ListItem key={i.name}><ListItemText primary={i.name} secondary={`${i.amount}${i.unit}`} /></ListItem>)}
      </List>
      <Box component='form' onSubmit={handleIngredientAdd} sx={{ padding: '5px', position: 'relative', left: '10px' }}>
        <TextField id='ingredientName' name='ingredient' label='Ingredient' variant='standard' autoComplete='off' /> <br />
        <TextField id='ingredientAmount' name='amount' label='Amount' variant='standard' autoComplete='off' /> <br />
        <TextField id='amountUnit' name='unit' label='Unit' variant='standard' autoComplete='off' /> <br /> <br />

        <Button sx={{ padding: '5px' }} variant='contained' color='success' type='submit'>Add ingredient</Button> <br />
      </Box>
      <TextField sx={{ padding: '5px' }} fullWidth id='workingMethod' label='Working method' autoComplete='off' value={method} placeholder='Instructions' variant='standard' multiline rows={6} onChange={handleMethod} /> <br />

      <Button sx={{ padding: '5px' }} variant='contained' onClick={addRecipe}>Add recipe</Button>
    </div>
  )
}

export default Recipeform
