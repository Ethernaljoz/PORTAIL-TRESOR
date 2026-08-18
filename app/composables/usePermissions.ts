import { useAuthStore } from '~/stores/auth'

export function usePermissions() {
  const authStore = useAuthStore()

  function can(_module: string, _permission?: string): boolean {
    return authStore.isAuthenticated
  }

  const isAdmin = computed(() => true)

  const isPermissionsReady = computed(() => authStore.user !== null)

  return {
    can,
    isAdmin,
    isPermissionsReady,
    user: computed(() => authStore.user),
  }
}
