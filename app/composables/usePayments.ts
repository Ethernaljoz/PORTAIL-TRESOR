import type { ColumnFiltersState } from '@tanstack/vue-table'
import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import type { PaginatedResponse, Payment } from '~/types/payment'
import { useQueryClient } from '@tanstack/vue-query'

export function usePayments() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()

  const specialities = ref<{ id: number, name: string }[]>([])

  async function loadSpecialities() {
    try {
      const { data } = await $axios.get('/specialities')
      specialities.value = data.data || data || []
    }
    catch {
      specialities.value = []
    }
  }

  function extractFilter(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(item => item.id === id)
    return f ? String(f.value) : ''
  }

  const fetcher = async (params: FetchParams): Promise<FetchResult<Payment>> => {
    const firstSort = params.sorting[0]
    const sortParam = firstSort
      ? `${firstSort.id},${firstSort.desc ? 'DESC' : 'ASC'}`
      : undefined

    const namespace = extractFilter(params.filters, 'namespace')
    const speciality = extractFilter(params.filters, 'speciality')

    const { data } = await $axios.get('/payments', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        search: params.search || undefined,
        speciality: speciality || undefined,
        namespace: namespace || undefined,
        sortBy: sortParam?.split(',')[0],
        sortOrder: sortParam?.split(',')[1],
      },
    })

    const result = data as PaginatedResponse<Payment>
    return {
      data: result.data || [],
      total: result.total || result.data?.length || 0,
      pageCount: result.last_page || 1,
    }
  }

  const printPayment = async (payment: Payment): Promise<void> => {
    try {
      const response = await $axios.post('/payments/print', { id: payment.id }, {
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${payment.code}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
    }
    catch (err) {
      console.error('Print error:', err)
    }
  }

  const resendCode = async (phone: string): Promise<void> => {
    await $axios.post('/payment/return-code', { phone })
  }

  const cancelPayment = async (payment: Payment): Promise<void> => {
    await $axios.post('/payments/canceled', {
      id: payment.id,
      code: payment.code,
      phone: payment.phone,
    })
    queryClient.invalidateQueries({ queryKey: ['payments'] })
  }

  // --- Payments to validate ---

  const types = ref<{ id: number, name: string, specialities: any[] }[]>([])
  const typeSpecialities = ref<{ id: number, name: string }[]>([])
  const praticiens = ref<{ id: number, name: string }[]>([])

  async function loadTypes() {
    try {
      const { data } = await $axios.get('/types-specialities')
      types.value = data || []
    }
    catch {
      types.value = []
    }
  }

  function onTypeChange(typeId: number | string) {
    const found = types.value.find(t => t.id === Number(typeId))
    if (found && found.specialities?.length) {
      typeSpecialities.value = [...found.specialities]
    }
    else {
      typeSpecialities.value = []
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

  async function identifyCustomer(phone: string, service: string) {
    try {
      const { data } = await $axios.post('/identify/cart', { phone, service })
      return data as { last_name?: string, first_name?: string }
    }
    catch {
      return {}
    }
  }

  async function validatePayment(form: {
    id: number
    code: string
    phone: string
    last_name: string
    first_name: string
    type: number | string
    speciality_id: number | string
    praticien_id: number | string
    praticien: string
  }) {
    await $axios.post('/payments/validate', form)
    queryClient.invalidateQueries({ queryKey: ['payments-to-validate'] })
  }

  const paymentsToValidateFetcher = async (params: FetchParams): Promise<FetchResult<Payment>> => {
    const { data } = await $axios.get('/payments-to-validate', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        search: params.search || undefined,
        namespace: 'paid',
      },
    })

    const result = data as PaginatedResponse<Payment>
    return {
      data: result.data || [],
      total: result.total || result.data?.length || 0,
      pageCount: result.last_page || 1,
    }
  }

  // --- Edit payment ---

  const agents = ref<{ id: number, name: string }[]>([])

  async function loadAgents() {
    try {
      const { data } = await $axios.get('/users/agent')
      agents.value = data || []
    }
    catch {
      agents.value = []
    }
  }

  async function editPayment(form: {
    id: number
    first_name: string
    last_name: string
    type_speciality_id: number | string
    speciality_id: number | string
    praticien_id: number | string
    praticien: string
    user_id: number | string
  }) {
    await $axios.post('/payment/edit', form)
    queryClient.invalidateQueries({ queryKey: ['payments'] })
  }

  return {
    specialities,
    loadSpecialities,
    fetcher,
    printPayment,
    resendCode,
    cancelPayment,
    types,
    typeSpecialities,
    praticiens,
    loadTypes,
    onTypeChange,
    loadPraticiens,
    identifyCustomer,
    validatePayment,
    paymentsToValidateFetcher,
    agents,
    loadAgents,
    editPayment,
  }
}
