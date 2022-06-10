import axios from 'axios'
import { SERVER_URL } from '../environment/constants'

export const ticketApi = axios.create({
  baseURL: `${SERVER_URL}/ticket`,
})
