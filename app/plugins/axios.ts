import axios from 'axios'

export default defineNuxtPlugin(() => {
  const { apiBase } = useRuntimeConfig().public

  const axiosInstance = axios.create({
    baseURL: apiBase,
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-client-type': 'web',
    },
  })

  axiosInstance.interceptors.request.use((config) => {
    if (import.meta.client) {
      const stored = localStorage.getItem('user_cnhu')
      if (stored) {
        try {
          const user = JSON.parse(stored)
          if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`
          }
        }
        catch {
        }
      }
    }
    return config
  })

  axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          await axios.post(`${apiBase}/auth/refresh`, {}, { withCredentials: true })
          return axiosInstance(originalRequest)
        }
        catch {
          if (import.meta.client) {
            localStorage.removeItem('user_cnhu')
          }
          const authStore = useAuthStore()
          authStore.clearUser()
          if (import.meta.client) {
            await navigateTo('/login')
          }
          return Promise.reject(error)
        }
      }

      return Promise.reject(error)
    },
  )

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
