import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { setNotification, setError } from '../reducers/notification'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAll: (state, action) => {
      return action.payload
    },
    register: (state, action) => {
      const newState = state.concat(action.payload)
      return newState
    }
  }
})

export const { getAll, register } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(getAll(users))
  }
}

export const registerUser = (content) => {
  return async dispatch => {
    try {
      const newUser = await userService.register(content)
      dispatch(setNotification('Register success! Log in to use app', 5))
      dispatch(register(newUser))
    } catch (error) {
      dispatch(setError(`Username '${content.username}' already used`, 5))
    }
  }
}

export default userSlice.reducer
