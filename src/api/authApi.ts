import axios from 'axios'
import { SERVER_URL } from '../environment/constants'

export const authApi = axios.create({
  baseURL: `${SERVER_URL}/user/login`,
})
