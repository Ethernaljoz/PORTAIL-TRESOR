import type { LoginCredentials, User } from '~/types/auth'
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  if (import.meta.client && !authStore.user) {
    authStore.loadFromStorage()
  }

  async function login(_credentials: LoginCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = authStore.mockLogin()
    return user
  }

  async function logout() {
    authStore.clearUser()
    router.push('/login')
  }

  return {
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    login,
    logout,
  }
}
