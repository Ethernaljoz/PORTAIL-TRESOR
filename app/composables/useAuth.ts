import type { LoginCredentials, LoginResponse, User } from '~/types/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const { $axios } = useNuxtApp()
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  const router = useRouter()

  // Restore user from localStorage on mount
  if (import.meta.client && !authStore.user) {
    authStore.loadFromStorage()
  }

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data } = await $axios.get('/auth/me')
        return data as User
      }
      catch {
        return null
      }
    },
    initialData: null,
    enabled: false,
  })

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await $axios.post('/auth/login', credentials)
      return data as LoginResponse
    },
    onSuccess: (data) => {
      if (data.status && data.user) {
        authStore.setUser(data.user)
        queryClient.setQueryData(['user'], data.user)
        const target = data.user.profile === '1' ? '/payments' : '/'
        router.push(target)
      }
    },
    onError: (error: any) => {
      const errors = error.response?.data?.errors
      if (errors) {
        const messages = Object.values(errors).flat()
        toast.error(`Erreur de connexion: ${messages.join(', ')}`)
      }
      else {
        toast.error('Email ou mot de passe incorrect')
      }
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await $axios.post('/auth/logout')
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
      authStore.clearUser()
      router.push('/login')
    },
    onError: () => {
      queryClient.setQueryData(['user'], null)
      authStore.clearUser()
      router.push('/login')
    },
  })

  return {
    user: computed(() => user.value ?? authStore.user),
    isLoading,
    refetch,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
  }
}
