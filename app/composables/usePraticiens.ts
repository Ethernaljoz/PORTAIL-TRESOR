import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import { useQueryClient } from '@tanstack/vue-query'

export interface Praticien {
  id: number
  name: string
  phone: string
  created_at: string
}

export function usePraticiens() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  const fetcher = async (params: FetchParams): Promise<FetchResult<Praticien>> => {
    const firstSort = params.sorting[0]
    const sortParam = firstSort ? `${firstSort.id},${firstSort.desc ? 'DESC' : 'ASC'}` : undefined

    const { data } = await $axios.get('/praticiens', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        search: params.search || undefined,
        sortBy: sortParam?.split(',')[0],
        sortOrder: sortParam?.split(',')[1],
      },
    })

    return {
      data: data.data || [],
      total: data.total || data.data?.length || 0,
      pageCount: data.last_page || 1,
    }
  }

  async function createPraticien(form: Record<string, any>): Promise<void> {
    await $axios.post('/praticiens/create', form)
    queryClient.invalidateQueries({ queryKey: ['praticiens'] })
  }

  async function updatePraticien(form: Record<string, any>): Promise<void> {
    await $axios.post('/praticiens/update', form)
    queryClient.invalidateQueries({ queryKey: ['praticiens'] })
  }

  async function deletePraticien(id: number): Promise<void> {
    await $axios.post('/praticiens/delete', { id })
    queryClient.invalidateQueries({ queryKey: ['praticiens'] })
  }

  return {
    fetcher,
    createPraticien,
    updatePraticien,
    deletePraticien,
  }
}
