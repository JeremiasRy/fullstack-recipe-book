import { createSlice } from '@reduxjs/toolkit'
import recipeService from '../services/recipe'
import { useNavigate } from 'react-router-dom'
import { logOut } from './login'
import { setError, setSnackbar } from './notification'

const initialState = null

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    getAll: (state, action) => {
      return action.payload
    },
    addRecipe: (state, action) => {
      return state.concat(action.payload)
    },
    editRec: (state, action) => {
      return state.map(s => s.name === action.payload.name ? action.payload : s)
    },
    delRecipe: (state, action) => {
      return state.filter(s => s.id !== action.payload)
    }
  }
})

export const { getAll, addRecipe, editRec, delRecipe } = recipeSlice.actions

export const initializeRecipes = () => {
  return async dispatch => {
    const recipes = await recipeService.getAll()
    dispatch(getAll(recipes))
  }
}
export const newRecipe = (recipe) => {
  return async dispatch => {
    try {
      const newRe = await recipeService.newRecipe(recipe)
      dispatch(addRecipe(newRe))
      dispatch(setSnackbar(`${newRe.name} Added succesfully!`, 5))
    } catch (error) {
      dispatch(setError('Your session has expired please login again', 5))
      dispatch(logOut())     
    }
  }
}
export const modifyRecipe = (recipe, id) => {
  return async dispatch => {
    try {
      const editRe = await recipeService.modifyRecipe(recipe, id)
      dispatch(editRec(editRe))
      dispatch(setSnackbar(`${editRe.name} Edited succesfully`, 5))
    } catch (error) {
      dispatch(setError("Session expired!", 5))
      dispatch(logOut())
    }
  }
}
export const removeRecipe = (id) => {
  return async dispatch => {
    try {
      const remove = await recipeService.removeRecipe(id)
      dispatch(setSnackbar(`Removed succesfully ${remove.name}`, 5))
      dispatch(delRecipe(remove.id))
    } catch (error) {
      dispatch(setError('Session expired', 5))
      dispatch(logOut())
    }
  }
}

export default recipeSlice.reducer
