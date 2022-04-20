import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Box from '@mui/system/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import Backdrop from '@mui/material/Backdrop'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { modifyRecipe, removeRecipe } from '../reducers/recipes'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../reducers/notification'


const Adjustrecipe = ({ recipe }) => {
  const [change, setChange] = useState(0)
  const [amounts, setAmounts] = useState()

  const handleChange = (e) => {
    const newAmount = Number(e.target.value)
    const ingredient = recipe.ingredients.find(i => i.name === e.target.id)
    const multiplier = newAmount / ingredient.amount
    const ingredients = recipe.ingredients.map(i => i)
    setAmounts(ingredients.map(i => Math.floor(i.amount * multiplier * 100) / 100))

    if (change === 1) {
      return setChange(0)
    }
    setChange(1)
  }

  return (
    <>
      <Typography variant='subtitle1'>Enter a new amount and the program will calculate the whole recipe according to that amount! If you wish to edit your recipe click the "edit"</Typography>
      <List>
        {amounts === undefined
          ? recipe.ingredients.map(i =>
            <ListItem key={i.name}>
              <ListItemText primary={i.name} secondary={`${i.amount}${i.unit}`} />
              <TextField id={i.name} placeholder='New amount' onChange={handleChange} autoComplete='off' />
            </ListItem>
            )
          : recipe.ingredients.map(i =>
            <ListItem key={i.name}>
              <ListItemText primary={i.name} secondary={`${amounts[recipe.ingredients.map(y => y.name).indexOf(i.name)]}${i.unit}`} />
              <TextField id={i.name} placeholder='New amount' onChange={handleChange} autoComplete='off' />
            </ListItem>
          )}
      </List>
      <Typography variant='subtitle1' gutterBottom component='div'>
        {recipe.method}
      </Typography>
    </>
  )
}

const Editrecipe = ({ recipe }) => {
  const [editedIngredients, setEditedIngredients] = useState([])
  const [editIngredient, setEditIngredient] = useState()
  const [editMethod, setEditMethod] = useState()
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const handleIngredientEdit = (e) => {
    e.preventDefault()
    const ingredient = {
      name: e.target.id,
      amount: Number(e.target.value),
      unit: e.target.name
    }
    setEditIngredient(ingredient)
  }
  const submitIngredient = (e) => {
    e.preventDefault(e)
    if (editedIngredients.length > 0) {
      return setEditedIngredients(editedIngredients.map(i => i.name === editIngredient.name ? editIngredient : i))
    }
    setEditedIngredients(recipe.ingredients.map(i => i.name === editIngredient.name ? editIngredient : i))
    e.currentTarget.reset()
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()

    const ingredientData = new FormData(e.currentTarget)

    let ingredientName = ingredientData.get('ingredient')
    let amount = ingredientData.get('amount')
    let unit = ingredientData.get('unit')

    if (ingredientName === '') {
      return dispatch(setInfo('Give your ingredient a name.', 5))
    }
    if (Number(amount) === 0) {
      return dispatch(setInfo('Please put in amount', 5))
    }
    if (unit === '') {
      return dispatch(setInfo('Give a unit', 5))
    }
    if (unit.length <= 2) {
      unit = unit.toLowerCase()
    }
    if (unit.length > 2) {
      const space = ' '
      unit = space.concat(unit)
    }

    const ingredient = {
      name: ingredientName,
      amount: Number(amount),
      unit: unit
    }
    if (editedIngredients.length === 0) {
      setEditedIngredients(recipe.ingredients.map(i => i).concat(ingredient))
      return e.currentTarget.reset()
    }
    setEditedIngredients(editedIngredients.concat(ingredient))
    e.currentTarget.reset()
  }

  const handleMethodChange = (e) => {
    e.preventDefault()
    setEditMethod(e.target.value)
  }

  const handleRecipeEdit = (e) => {
    e.preventDefault()
    const editRecipe = {
      name: recipe.name,
      ingredients: editedIngredients,
      method: recipe.method
    }
    if (editMethod !== undefined) {
      editRecipe.method = editMethod
    }
    dispatch(modifyRecipe(editRecipe, recipe.id))
    navigate('/')
  }
  const removeIngredient = (e) => {
    e.preventDefault()
    if (editedIngredients.length === 0) {
      return setEditedIngredients(recipe.ingredients.filter(i => i.name !== e.target.value))
    }
    setEditedIngredients(editedIngredients.filter(i => i.name !== e.target.value))
  }

  return (
    <>
      <Typography variant='subtitle1'>Enter new amount and press 'edit' when you have made all the changes you wish press 'save'</Typography>
      <List>
        {editedIngredients.length !== 0
          ? editedIngredients.map(i => <ListItem key={i.name}><ListItemText primary={i.name} secondary={`${i.amount}${i.unit}`} />
            <Box sx={{ textAlign: 'right' }} component='form' onSubmit={submitIngredient}>
              <TextField id={i.name} name={i.unit} placeholder='Amount' onChange={handleIngredientEdit} sx={{ width: '150px' }} autoComplete='off' />
              <Button type='submit' color='secondary'>Edit</Button><Button value={i.name} color='warning' size='small' startIcon={<DeleteIcon />} onClick={removeIngredient}>Remove</Button>
            </Box>
                                       </ListItem>)
          : recipe.ingredients.map(i =>
            <ListItem key={i.name}>
              <ListItemText primary={i.name} secondary={`${i.amount}${i.unit}`} />
              <Box sx={{ textAlign: 'right' }} component='form' onSubmit={submitIngredient}>
                <TextField id={i.name} name={i.unit} placeholder='Amount' onChange={handleIngredientEdit} sx={{ width: '150px' }} autoComplete='off' />
                <Button type='submit' color='secondary' size='small'>Edit</Button><Button value={i.name} color='warning' size='small' startIcon={<DeleteIcon />} onClick={removeIngredient}>Remove</Button>
              </Box>
            </ListItem>)}
      </List>

      <Box component='form' onSubmit={handleAddIngredient} sx={{ padding: '5px', position: 'relative', left: '10px' }}>
        <TextField id='ingredientName' name='ingredient' label='Ingredient' variant='standard' autoComplete='off' /><br />
        <TextField id='ingredientAmount' name='amount' label='Amount' variant='standard' autoComplete='off' /><br />
        <TextField id='amountUnit' name='unit' label='Unit' variant='standard' autoComplete='off' /> <br /> <br />

        <Button sx={{ padding: '5px' }} variant='contained' color='success' type='submit'>Add ingredient</Button>
      </Box>
      <TextField sx={{ padding: '5px' }} fullWidth id='workingMethod' label='Edit working method' placeholder={recipe.method} variant='standard' multiline rows={4} onChange={handleMethodChange} autoComplete='off' /> <br />
      <Button sx={{ padding: '5px' }} variant='contained' color='primary' onClick={handleRecipeEdit}>Save recipe</Button>
    </>
  )
}

const Drawrecipe = ({ recipe, amounts }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const openConfirm = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  const remRecipe = () => {
    navigate('/')
    dispatch(removeRecipe(recipe.id))
  }

  return (
    <>
      {open === true && <Backdrop onClick={() => { setOpen(!open) }} open={open} />}
      <List>
        {amounts === undefined
          ? recipe.ingredients.map(i => <ListItem key={i.name}> <ListItemText primary={i.name} secondary={`${i.amount}${i.unit}`} /> </ListItem>)
          : recipe.ingredients.map(i => <ListItem key={i.name}> <ListItemText primary={i.name} secondary={`${amounts[recipe.ingredients.map(y => y.name).indexOf(i.name)]}${i.unit}`} /></ListItem>)}
      </List>
      <Typography variant='subtitle1' gutterBottom component='div'>
        {recipe.method}
      </Typography>
      {open === false
        ? <Button variant='contained' color='warning' onClick={openConfirm}>Remove recipe</Button>
        : <><Button variant='contained' color='error' onClick={remRecipe} startIcon={<DeleteIcon />}>Are you sure?</Button>
          <Button variant='contained' color='secondary' sx={{ position: 'relative', left: '5px' }} onClick={() => { setOpen(!open) }}>Undo</Button>
          </>}

    </>
  )
}

const Recipe = ({ recipe, isValid }) => {
  const [amounts, setAmounts] = useState()
  const [recipeState, setRecipeState] = useState(0) // This is not very good solution but atleast it works
  const user = useSelector(state => state.login)

  if (recipe === null) {
    return null
  }

  const handleNormal = () => {
    setAmounts(recipe.ingredients.map(i => i.amount))
    if (recipeState === 1) {
      return setRecipeState(0)
    }
    setRecipeState(1)
  }

  const handleDouble = () => {
    setAmounts(recipe.ingredients.map(i => i = i.amount * 2))
    if (recipeState === 1) {
      return setRecipeState(0)
    }
    setRecipeState(1)
  }

  const handleQuadruple = () => {
    setAmounts(recipe.ingredients.map(i => i = i.amount * 4))
    if (recipeState === 1) {
      return setRecipeState(0)
    }
    setRecipeState(1)
  }

  const handleHalf = () => {
    setAmounts(recipe.ingredients.map(i => i = i.amount * 0.5))
    if (recipeState === 1) {
      return setRecipeState(0)
    }
    setRecipeState(1)
  }

  return (
    <><Link to='/'>Home</Link>
      <Typography content='h1' variant='h2'>{recipe.name}</Typography>
      <Button onClick={handleDouble}>Double</Button>
      <Button onClick={handleQuadruple}>4x</Button>
      <Button onClick={handleHalf}>Half</Button>
      <Button onClick={() => { setRecipeState(2) }}>Adjust</Button>
      <Button onClick={() => { setRecipeState(3) }}>Edit recipe</Button>
      <Button onClick={handleNormal}>Normal</Button>
      {recipeState === 0 && <Drawrecipe recipe={recipe} amounts={amounts} user={user} />}
      {recipeState === 1 && <Drawrecipe recipe={recipe} amounts={amounts} user={user} />}
      {recipeState === 2 && <Adjustrecipe recipe={recipe} />}
      {recipeState === 3 && <Editrecipe recipe={recipe} setRecipestate={setRecipeState} />}
    </>
  )
}

export default Recipe
