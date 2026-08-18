import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import { useQueryClient } from '@tanstack/vue-query'

export interface UserListItem {
  id: number
  last_name: string
  first_name: string
  email: string
  phone: string
  profile: '1' | '2'
}

export function useUsers() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  const fetcher = async (params: FetchParams): Promise<FetchResult<UserListItem>> => {
    const { data } = await $axios.get('/users', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        search: params.search || undefined,
      },
    })

    return {
      data: data.data || [],
      total: data.total || data.data?.length || 0,
      pageCount: data.last_page || 1,
    }
  }

  async function createUser(form: {
    first_name: string
    last_name: string
    email: string
    phone: string
    profile: string
    password: string
  }) {
    await $axios.post('/users/create', form)
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  async function updateUser(form: {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    profile: string
  }) {
    await $axios.post('/users/update', form)
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  async function deleteUser(id: number) {
    await $axios.post('/users/remove', { id })
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  return {
    fetcher,
    createUser,
    updateUser,
    deleteUser,
  }
}
