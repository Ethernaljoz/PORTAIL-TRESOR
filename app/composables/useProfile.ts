import { useQueryClient } from '@tanstack/vue-query'

export function useProfile() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  async function updateProfile(form: {
    id: number
    last_name: string
    first_name: string
    email: string
    phone: string
  }) {
    await $axios.post('/users/profile', form)
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  async function updatePassword(form: {
    id: number
    ancien_mot_de_passe: string
    mot_de_passe: string
    mot_de_passe_confirmation: string
  }) {
    await $axios.post('/users/password', form)
  }

  return {
    updateProfile,
    updatePassword,
  }
}
