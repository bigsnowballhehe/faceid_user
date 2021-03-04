import axios from 'axios'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})

export default request
