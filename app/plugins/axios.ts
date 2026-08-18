import axios from 'axios'

export default defineNuxtPlugin(() => {
  const { apiBase } = useRuntimeConfig().public

  const axiosInstance = axios.create({
    baseURL: apiBase,
    headers: {
      'Content-Type': 'application/json',
      'x-client-type': 'web',
    },
  })

  axiosInstance.interceptors.request.use((config) => {
    if (import.meta.client) {
      const stored = localStorage.getItem('tresor_dev_session')
      if (stored) {
        try {
          const user = JSON.parse(stored)
          if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`
          }
        }
        catch {}
      }
    }
    return config
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
