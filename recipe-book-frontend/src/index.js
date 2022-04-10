import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/login'
import notificationReducer from './reducers/notification'
import recipeReducer from './reducers/recipes'
import userReducer from './reducers/users'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const store = configureStore({
  reducer: {
    login: loginReducer,
    notification: notificationReducer,
    recipes: recipeReducer,
    users: userReducer
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
