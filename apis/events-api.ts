import axios from 'axios'

const eventsAPI = axios.create({
  baseURL: '/api/events'
})

export default eventsAPI