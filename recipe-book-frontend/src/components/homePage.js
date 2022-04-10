import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Recipeform from './recipeForm'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuIcon from '@mui/icons-material/Menu'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

const Home = ({ user, handleLogOut }) => {
  const [showForm, setShowForm] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [filter, setFilter] = useState('')
  const allRecipes = useSelector(state => state.recipes)
  const recipes = allRecipes.filter(r => r.user.id === user.id || r.user === user.id)
  const users = useSelector(state => state.users)
  const filteredRecipes = recipes.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()))
  const navigate = useNavigate()

  const navTo = (e) => {
    e.preventDefault()
    navigate(`recipes/${e.target.value}`)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  if (!recipes || !users) {
    return null
  }

  const recipeToDraw = filter !== ''
    ? filteredRecipes
    : recipes

  return (
    <>
      <div style={{ position: 'relative', top: '5vh', minHeight: '100ch' }}>
        <Typography content='h1' variant='h4'>Welcome {user.name}!</Typography> <br />
        <Button onClick={() => { setShowRecipes(!showRecipes) }} startIcon={<MenuIcon />}>Recipes</Button>
        <Button onClick={() => { setShowForm(!showForm) }} startIcon={<AddOutlinedIcon />}>Add a recipe</Button> <br />
        {showRecipes === true && <TextField variant='standard' size='small' label='Search recipe' value={filter} onChange={handleChange} autoComplete='off' />}
        <List>
          {showRecipes === true && recipeToDraw.map(r => <ListItem key={r.id}><Button onClick={navTo} value={r.id} size='small'>{r.name}</Button></ListItem>)}
        </List>
        {showForm === true && <Recipeform setShowForm={setShowForm} />}
        <br />
        <Button variant='contained' color='secondary' onClick={handleLogOut} startIcon={<LogoutOutlinedIcon />} sx={{ position: 'relative', left: '5px', bottom: '5px' }}>Log Out</Button>
      </div>
    </>
  )
}

export default Home
