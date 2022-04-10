import axios from 'axios'
const baseUrl = '/api/users'

const register = async (user) => {
  const request = await axios.post(baseUrl, user)
  return request.data
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { register, getAll }
