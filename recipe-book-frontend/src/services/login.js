import axios from 'axios'

const baseUrl = '/api/login'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const login = async (user) => {
  const request = await axios.post(baseUrl, user)
  return request.data
}
const check = async () => {
  const config = {
    headers: { authorization: token }
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

export default { login, check, setToken }
