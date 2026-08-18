import type { User } from '~/types/auth'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'user_cnhu'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: state => !!state.user?.token,
    userGrant: state => state.user?.grant ?? null,
    userProfile: state => state.user?.profile ?? null,
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
    hasGrant(module: string, permission?: string): boolean {
      if (!this.user?.grant)
        return false
      if (String(this.user.profile) === '2')
        return true
      const grant = this.user.grant as Record<string, any>
      if (permission) {
        const mod = grant[module]
        return mod ? !!mod[permission] : false
      }
      return !!grant[module]
    },
  },
})
