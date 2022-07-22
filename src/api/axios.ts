import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' }
})

export default instance
