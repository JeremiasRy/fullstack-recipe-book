import LoginOrRegisterform from './components/loginOrRegisterForm'
import Notification from './components/notification'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
import { logOut, setUser } from './reducers/login'
import { initializeRecipes } from './reducers/recipes'
import { initializeUsers } from './reducers/users'
import Recipe from './components/recipe'
import recipeService from './services/recipe'
import loginService from './services/login'
import Home from './components/homePage'
import { setNotification } from './reducers/notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const recipes = useSelector(state => state.recipes)

  const handleLogOut = () => {
    dispatch(setNotification(`${user.name} Logged out.`, 5))
    window.localStorage.clear()
    dispatch(logOut())
    recipeService.setToken('null')
  }

  useEffect(() => {
    async function fecthUser () {
      const currentUserJson = window.localStorage.getItem('currentUser')
      if (currentUserJson) {
        const user = JSON.parse(currentUserJson)
        loginService.setToken(user.token)
        const isValid = await loginService.check()
        if (isValid !== false) {
          dispatch(setUser(user))
          return recipeService.setToken(user.token)
        }
        dispatch(setNotification('Session expired', 5))
        window.localStorage.clear()
        dispatch(logOut())
        recipeService.setToken('null')
        loginService.setToken('null')
      }
    }
    fecthUser()
  }, [dispatch])

  useEffect(() => { dispatch(initializeRecipes()) }, [dispatch])
  useEffect(() => { dispatch(initializeUsers()) }, [dispatch])

  const recipeMatch = useMatch('/recipes/:id')
  if (!recipes) {
    return (
      null
    )
  }
  const recipe = recipeMatch
    ? recipes.find(r => r.id === recipeMatch.params.id)
    : null

  return (
    <>
      <Container maxWidth='sm'>
        <Notification />
        <Box sx={{ height: '100vh', padding: '20px' }}>
          <Routes>
            <Route path='/' element={user ? <Home user={user} handleLogOut={handleLogOut} /> : <Box sx={{ textAlign: 'center' }}> <LoginOrRegisterform /> </Box>} />
            <Route path='/recipes/:id' element={<Recipe recipe={recipe} />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
}

export default App
