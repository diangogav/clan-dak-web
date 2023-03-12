import axios from 'axios'

const playersAPI = axios.create({
  baseURL: '/api'
})

export default playersAPI