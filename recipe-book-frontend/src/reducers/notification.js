import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let currentTimer

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationPutter: (state, action) => {
      return action.payload
    },
    notificationRemove: (state, action) => {
      return null
    }
  }
})

export const { notificationPutter, notificationRemove } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    const msg = { type: 'success', message: message, snackbar: false }
    dispatch(notificationPutter(msg))
    clearTimeout(currentTimer)
    currentTimer = setTimeout(() => { dispatch(notificationRemove()) }, time * 1000)
  }
}

export const setError = (message, time) => {
  return dispatch => {
    const msg = { type: 'error', message: message, snackbar: false }
    dispatch(notificationPutter(msg))
    clearTimeout(currentTimer)
    currentTimer = setTimeout(() => { dispatch(notificationRemove()) }, time * 1000)
  }
}

export const setInfo = (message, time) => {
  return dispatch => {
    const msg = { type: 'info', message: message, snackbar: false }
    dispatch(notificationPutter(msg))
    clearTimeout(currentTimer)
    currentTimer = setTimeout(() => { dispatch(notificationRemove()) }, time * 1000)
  }
}

export const setSnackbar = (message, time) => {
  return dispatch => {
    const msg = { type: 'info', message: message, snackbar: true }
    dispatch(notificationPutter(msg))
    clearTimeout(currentTimer)
    currentTimer = setTimeout(() => { dispatch(notificationRemove()) }, time * 1000)
  }
}
export default notificationSlice.reducer
