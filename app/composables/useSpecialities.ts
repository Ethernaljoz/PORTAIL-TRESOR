import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import { useQueryClient } from '@tanstack/vue-query'

export interface Speciality {
  id: number
  name: string
  type: string
  type_sp?: string
  created_at: string
  praticien?: string
}

export function useSpecialities() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  async function loadPraticiens(): Promise<{ id: number, name: string }[]> {
    try {
      const { data } = await $axios.get('/praticiens/list')
      return data || []
    }
    catch {
      return []
    }
  }

  const fetcher = async (params: FetchParams): Promise<FetchResult<Speciality>> => {
    const firstSort = params.sorting[0]
    const sortParam = firstSort ? `${firstSort.id},${firstSort.desc ? 'DESC' : 'ASC'}` : undefined

    const { data } = await $axios.get('/specialities/list', {
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

  async function createSpeciality(form: Record<string, any>): Promise<void> {
    await $axios.post('/specialities/create', form)
    queryClient.invalidateQueries({ queryKey: ['specialities'] })
  }

  async function updateSpeciality(form: Record<string, any>): Promise<void> {
    await $axios.post('/specialities/update', form)
    queryClient.invalidateQueries({ queryKey: ['specialities'] })
  }

  async function deleteSpeciality(id: number): Promise<void> {
    await $axios.post('/specialities/delete', { id })
    queryClient.invalidateQueries({ queryKey: ['specialities'] })
  }

  const specialityTypes = [
    { id: '1', name: 'Consultation en chirurgie externe' },
    { id: '2', name: 'Consultation en medecine externe' },
    { id: '3', name: 'Autres types de consultation' },
  ]

  return {
    fetcher,
    loadPraticiens,
    createSpeciality,
    updateSpeciality,
    deleteSpeciality,
    specialityTypes,
  }
}
