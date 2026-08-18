import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (import.meta.server) {
    return
  }

  if (!authStore.user) {
    authStore.loadFromStorage()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
