import axios from 'axios'

const baseUrl = '/api/login'

const login = async (user) => {
  const request = await axios.post(baseUrl, user)
  return request.data
}
const check = async (user) => {
  const token = (token) => {
    const conToken = `bearer ${token}`
    return conToken
  }
  const config = {
    headers: { authorization: token(user.token) }
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

export default { login, check }
