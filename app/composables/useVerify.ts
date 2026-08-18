import type { ColumnFiltersState } from '@tanstack/vue-table'
import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import type { Payment } from '~/types/payment'

export function useVerify() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  function extractFilter(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(item => item.id === id)
    return f ? String(f.value) : ''
  }

  const fetcher = async (params: FetchParams): Promise<FetchResult<Payment>> => {
    const date_debut = extractFilter(params.filters, 'date_debut') || undefined
    const date_fin = extractFilter(params.filters, 'date_fin') || undefined
    const search = extractFilter(params.filters, 'search') || undefined

    const { data } = await $axios.get('/payments/verify', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        date_debut,
        date_fin,
        search,
      },
    })

    return {
      data: data.data || [],
      total: data.total || data.data?.length || 0,
      pageCount: data.last_page || 1,
    }
  }

  async function createAfterFail(id: number) {
    await $axios.post('/payments/create-after-fail', { id })
    queryClient.invalidateQueries({ queryKey: ['payments-verify'] })
  }

  return {
    fetcher,
    createAfterFail,
  }
}
