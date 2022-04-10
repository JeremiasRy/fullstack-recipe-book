import { createSlice } from '@reduxjs/toolkit'
import recipeService from '../services/recipe'
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
      dispatch(setError('Your session has expired please log out and login again', 5))
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
      dispatch(setError('You are not allowed to edit this', 5))
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
      dispatch(setError('Can not do this', 5))
    }
  }
}

export default recipeSlice.reducer
