import { defineStore, acceptHMRUpdate } from "pinia";

import { loginWithUsernameAndPassword } from "./../../services/authService";

// TODO: Add user types
export interface AuthState {
  isLoading: boolean;
  error: unknown | null;
  user: any | null;
}

const state = (): AuthState => ({
  isLoading: false,
  error: null,
  user: null,
});

export const useAuthStore = defineStore("auth", {
  state,
  actions: {
    async login(userName: string, password: string) {
      this.isLoading = true;

      // TODO: Login Logic
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
