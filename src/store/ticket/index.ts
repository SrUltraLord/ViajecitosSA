import { Ticket } from './../../model/Ticket'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { buyTicket, getTicketsByUserNui } from '../../services/ticketService'

export interface TicketState {
  isLoading: boolean
  error: unknown | null
  tickets: Ticket[] | undefined
  message: string | null
}

const state = (): TicketState => ({
  isLoading: false,
  error: null,
  tickets: undefined,
  message: null,
})

export const useTicketStore = defineStore('ticket', {
  state,
  actions: {
    async getTicketsByUserNui(nui: string) {
      this.isLoading = false

      try {
        const tickets = await getTicketsByUserNui(nui)
        this.tickets = tickets!
      } catch (error) {
        console.error(error)
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    async buyTicket(userId: number, flightId: number) {
      this.isLoading = true

      try {
        const response = await buyTicket(userId, flightId)
        this.message = response.message!
      } catch (error) {
        console.error(error)
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot))
}
