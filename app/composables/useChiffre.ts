import type { ColumnFiltersState } from '@tanstack/vue-table'
import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import type { PaginatedResponse, Payment } from '~/types/payment'

export function useChiffre() {
  const { $axios } = useNuxtApp()

  const types = ref<{ id: number, name: string, specialities: any[] }[]>([])
  const specialities = ref<{ id: number | string, name: string }[]>([])
  const praticiens = ref<{ id: number, name: string }[]>([])
  const summary = ref<{ amount: number | null }>({ amount: null })
  const operatorTotal = ref(0)
  const isExporting = ref(false)

  async function loadTypes() {
    try {
      const { data } = await $axios.get('/types-specialities')
      types.value = data || []
      types.value.unshift({ id: 0, name: 'Tous', specialities: [] })
    }
    catch {
      types.value = [{ id: 0, name: 'Tous', specialities: [] }]
    }
  }

  function onTypeChange(typeId: number | string) {
    const found = types.value.find(t => t.id === Number(typeId))
    if (found && found.specialities?.length) {
      specialities.value = [...found.specialities]
      specialities.value.unshift({ id: 'all', name: 'Tous' })
    }
    else {
      specialities.value = [{ id: 'all', name: 'Tous' }]
    }
  }

  async function loadPraticiens(specialityId: number | string) {
    if (!specialityId) {
      praticiens.value = []
      return
    }
    try {
      const { data } = await $axios.post('/praticiens/where', { id: specialityId })
      praticiens.value = data || []
    }
    catch {
      praticiens.value = []
    }
  }

  function extractFilter(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(item => item.id === id)
    return f ? String(f.value) : ''
  }

  const specialitiesFetcher = async (params: FetchParams): Promise<FetchResult<Payment>> => {
    const firstSort = params.sorting[0]
    const sortParam = firstSort ? `${firstSort.id},${firstSort.desc ? 'DESC' : 'ASC'}` : undefined

    const date_debut = extractFilter(params.filters, 'date_debut') || ''
    const date_fin = extractFilter(params.filters, 'date_fin') || ''
    const type = extractFilter(params.filters, 'type')
    const speciality = extractFilter(params.filters, 'speciality')
    const praticien_id = extractFilter(params.filters, 'praticien_id')

    const { data } = await $axios.get('/statistics/validate-specialities', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        date_debut: date_debut || undefined,
        date_fin: date_fin || undefined,
        type: type || undefined,
        speciality: speciality || undefined,
        praticien_id: praticien_id || undefined,
        sortBy: sortParam?.split(',')[0],
        sortOrder: sortParam?.split(',')[1],
      },
    })

    const result = data as PaginatedResponse<Payment> & { amount?: { amount?: number } }
    summary.value = result.amount ?? null

    return {
      data: result.data || [],
      total: result.total || result.data?.length || 0,
      pageCount: result.last_page || 1,
    }
  }

  function createOperatorFetcher() {
    return async (params: FetchParams): Promise<FetchResult<Payment>> => {
      const firstSort = params.sorting[0]
      const sortParam = firstSort ? `${firstSort.id},${firstSort.desc ? 'DESC' : 'ASC'}` : undefined

      const date_debut = extractFilter(params.filters, 'date_debut') || ''
      const date_fin = extractFilter(params.filters, 'date_fin') || ''
      const action = extractFilter(params.filters, 'action') || '1'

      const { data } = await $axios.get('/statistics/operator', {
        params: {
          page: params.page + 1,
          size: params.pageSize,
          date_debut: date_debut || undefined,
          date_fin: date_fin || undefined,
          action,
          sortBy: sortParam?.split(',')[0],
          sortOrder: sortParam?.split(',')[1],
        },
      })

      operatorTotal.value = data.total ?? 0

      return {
        data: data.content?.data || [],
        total: data.content?.total || 0,
        pageCount: data.content?.last_page || 1,
      }
    }
  }

  async function exportSpecialities(model: Record<string, any>) {
    isExporting.value = true
    try {
      const response = await $axios.post('/statistics/validate-specialities', model, {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'payment_valider_par_specialite.xlsx')
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
    }
    catch {
    }
    finally {
      isExporting.value = false
    }
  }

  async function exportOperator(model: Record<string, any>) {
    isExporting.value = true
    try {
      const response = await $axios.post('/statistics/operator', model, {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'payment_par_operateur.xlsx')
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
    }
    catch {
    }
    finally {
      isExporting.value = false
    }
  }

  return {
    types,
    specialities,
    praticiens,
    summary,
    operatorTotal,
    isExporting,
    loadTypes,
    onTypeChange,
    loadPraticiens,
    specialitiesFetcher,
    createOperatorFetcher,
    exportSpecialities,
    exportOperator,
  }
}
