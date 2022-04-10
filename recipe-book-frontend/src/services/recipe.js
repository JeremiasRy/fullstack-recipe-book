import axios from 'axios'
const baseUrl = '/api/recipes'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const newRecipe = async (recipe) => {
  const config = {
    headers: { authorization: token }
  }
  const request = await axios.post(baseUrl, recipe, config)
  return request.data
}

const modifyRecipe = async (recipe, id) => {
  const config = {
    headers: { authorization: token }
  }
  const request = await axios.put(`${baseUrl}/${id}`, recipe, config)
  return request.data
}

const removeRecipe = async (id) => {
  const config = {
    headers: { authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, newRecipe, setToken, modifyRecipe, removeRecipe }
