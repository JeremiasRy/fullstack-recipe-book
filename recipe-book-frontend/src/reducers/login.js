import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import recipeService from '../services/recipe'
import { setError, setNotification } from './notification'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    logOut: (state, action) => {
      return null
    }
  }
})

export const { setUser, logOut } = loginSlice.actions

export const userLogin = (content) => {
  return async dispatch => {
    try {
      const user = await loginService.login(content)
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification(`${user.name} Logged in!`, 5))
      recipeService.setToken(user.token)
    } catch (error) {
      dispatch(setError('Wrong username or password', 5))
    }
  }
}

export default loginSlice.reducer
