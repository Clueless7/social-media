import Axios from 'axios'
import { API_BASE_URL } from '../config'

const axios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default axios
