import axios from 'axios'
import { SERVER_URL } from '../environment/constants'

export const flightApi = axios.create({
  baseURL: `${SERVER_URL}/flight`,
})
