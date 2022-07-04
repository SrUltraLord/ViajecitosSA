import { defineStore, acceptHMRUpdate } from 'pinia'
import { RegisterUser } from '../../model/RegisterUser'
import { User } from '../../model/User'

import authService from './../../services/authService'

export interface AuthState {
  isLoading: boolean
  error: any | null
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
    async loginWithEmailAndPassword(email: string, password: string) {
      this.isLoading = true
      this.user = null
      this.error = null

      try {
        const { data } = await authService.loginWithEmailAndPassword(
          email,
          password,
        )

        this.user = data!
      } catch (error: any) {
        this.error = error.response.data
      } finally {
        this.isLoading = false
      }
    },
    async registerUser(newUser: RegisterUser) {
      this.isLoading = true
      this.error = null

      try {
        await authService.registerUser(newUser)
      } catch (error: any) {
        this.error = error.response.data
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
