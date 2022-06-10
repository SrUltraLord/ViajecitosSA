import { defineStore, acceptHMRUpdate } from 'pinia'
import { Flight } from '../../model/Flight'
import { searchFlight } from '../../services/flightService'

export interface FlightState {
  isLoading: boolean
  error: unknown | null
  flight: Flight | null
}

const state = (): FlightState => ({
  isLoading: false,
  error: null,
  flight: null,
})

export const useFlightStore = defineStore('flight', {
  state,
  actions: {
    async searchFlight(
      cityOrigin: string,
      cityDestination: string,
      dateFrom: string,
      dateTo: string,
    ) {
      this.isLoading = true

      try {
        const flight = await searchFlight(
          cityOrigin,
          cityDestination,
          dateFrom.slice(0, 10),
          dateTo.slice(0, 10),
        )
        this.flight = flight!
      } catch (error) {
        console.error(error)
        this.flight = null
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    clearFlight() {
      this.flight = null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlightStore, import.meta.hot))
}
