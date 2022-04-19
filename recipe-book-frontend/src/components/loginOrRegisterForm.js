import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { userLogin } from '../reducers/login'
import { registerUser } from '../reducers/users'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setError } from '../reducers/notification'

const Loginform = () => {
  const dispatch = useDispatch()
  const [loginRegister, setLoginRegister] = useState(true) // true: loginform, false: registerform

  function login (username, password) {
    dispatch(userLogin({ username, password }))
  }

  function register (username, name, password, confirmPassword) {
    if (password !== confirmPassword) {
      return dispatch(setError('Password confirmation did not match', 5))
    }
    dispatch(registerUser({ username, name, password }))
    setTimeout(() => { setLoginRegister(true) }, 1000)
  }

  const logReg = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const username = data.get('username')
    const name = data.get('name')
    const password = data.get('password')
    const confirmPassword = data.get('confirmpassword')

    if (loginRegister === true) {
      return login(username, password)
    }
    if (loginRegister === false) {
      if (username.length < 3) {
        return dispatch(setError('Username needs to be longer than 3 characters', 5))
      }
      if (password.length < 4) {
        return dispatch(setError('Password needs to be longer than 4 characters', 5))
      }
      register(username, name, password, confirmPassword)
      return e.currentTarget.reset()
    }
  }

  return (
    <Box component='form' sx={{ position: 'relative', top: '20vh' }} noValidate autoComplete='off' onSubmit={logReg}>

      {loginRegister === true
        ? <><Typography component='h1' variant='h5' sx={{ padding: '10px' }}> Log in </Typography></>
        : <><Typography component='h1' variant='h5' sx={{ padding: '10px' }}> Sign Up </Typography></>}

      <br />
      <TextField sx={{ padding: '5px' }} required id='usernameInput' name='username' label='Username?' variant='standard' autoComplete='off' />  <br />
      <TextField sx={{ padding: '5px' }} required id='passwordInput' name='password' label='Password' type='password' variant='standard' /> <br />

      {loginRegister === true
        ? <><Button variant='contained' type='submit'>Login</Button><Button variant='secondary' onClick={() => { setLoginRegister(!loginRegister) }}>Sign up!</Button> </>
        : <><TextField sx={{ padding: '5px' }} required id='ConfirmPasswordInput' name='confirmpassword' label='Confirm password' type='password' variant='standard' />  <br />
          <TextField sx={{ padding: '5px' }} required id='nameInput' name='name' label='Youre name?' variant='standard' autoComplete='off' /> <br />
          <Button variant='contained' type='submit'>Register</Button><Button variant='secondary' onClick={() => { setLoginRegister(!loginRegister) }}>Log in</Button>  <br />
          </>}

    </Box>
  )
}

export default Loginform
