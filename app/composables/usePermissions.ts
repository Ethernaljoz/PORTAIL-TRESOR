import { useAuthStore } from '~/stores/auth'

export function usePermissions() {
  const authStore = useAuthStore()

  function can(module: string, permission?: string): boolean {
    return authStore.hasGrant(module, permission)
  }

  const isAdmin = computed(() => authStore.userProfile === '2')

  const isPermissionsReady = computed(() => authStore.user !== null)

  return {
    can,
    isAdmin,
    isPermissionsReady,
    user: computed(() => authStore.user),
    grant: computed(() => authStore.userGrant),
  }
}
