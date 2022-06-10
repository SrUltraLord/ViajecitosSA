import { defineStore, acceptHMRUpdate } from 'pinia'
import { User } from '../../model/User'

import { loginWithNui } from './../../services/authService'

export interface AuthState {
  isLoading: boolean
  error: unknown | null
  user: User | null
}

const state = (): AuthState => ({
  isLoading: false,
  error: null,
  user: null,
})

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    async loginWithNui(nui: string) {
      this.isLoading = true

      try {
        const user = await loginWithNui(nui)
        this.user = user!
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      this.user = null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
