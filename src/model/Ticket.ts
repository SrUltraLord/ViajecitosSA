import { Flight } from './Flight'

export interface Ticket {
  id: number
  flight: Flight
  dateBought: string
}
