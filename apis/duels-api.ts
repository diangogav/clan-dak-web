import axios from 'axios'

const duelsAPI = axios.create({
  baseURL: '/api/players'
})

export default duelsAPI