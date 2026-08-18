import type { User } from '~/types/auth'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'tresor_dev_session'

const MOCK_USER: User = {
  id: 1,
  name: 'Développeur TRésor',
  email: 'dev@tresor.bf',
  token: 'mock-jwt-token-xxxxxxxxxxxx',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: state => !!state.user?.token,
  },
  actions: {
    setUser(user: User) {
      this.user = user
      if (import.meta.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      }
    },
    clearUser() {
      this.user = null
      if (import.meta.client) {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    loadFromStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            this.user = JSON.parse(stored) as User
          }
          catch {
            localStorage.removeItem(STORAGE_KEY)
          }
        }
      }
    },
    mockLogin() {
      this.setUser(MOCK_USER)
      return MOCK_USER
    },
  },
})
