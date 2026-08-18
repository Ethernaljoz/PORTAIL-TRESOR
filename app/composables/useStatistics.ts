import type { ColumnFiltersState } from '@tanstack/vue-table'
import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import type { Payment } from '~/types/payment'

export function useStatistics() {
  const { $axios } = useNuxtApp()

  const isExporting = ref(false)

  function extractFilter(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(item => item.id === id)
    return f ? String(f.value) : ''
  }

  function parseResponse(data: any): { data: Payment[], total: number, pageCount: number, amount: number | null } {
    // API renvoie { payments: { data: [...], total: N, last_page: N }, amount: { amount: "..." } }
    const content = data.payments || data.content || data
    const amountRaw = data.amount ?? null
    return {
      data: content.data || [],
      total: content.total || 0,
      pageCount: content.last_page || 1,
      amount: typeof amountRaw === 'object' ? (amountRaw?.amount ? Number(amountRaw.amount) : null) : (amountRaw ? Number(amountRaw) : null),
    }
  }

  function createFetcher(endpoint: string, getExtraParams?: () => Record<string, any>) {
    return async (params: FetchParams): Promise<FetchResult<Payment>> => {
      const date_debut = extractFilter(params.filters, 'date_debut') || undefined
      const date_fin = extractFilter(params.filters, 'date_fin') || undefined

      const { data } = await $axios.get(endpoint, {
        params: {
          page: params.page + 1,
          size: params.pageSize,
          date_debut,
          date_fin,
          ...getExtraParams?.(),
        },
      })

      const parsed = parseResponse(data)

      return {
        data: parsed.data,
        total: parsed.total,
        pageCount: parsed.pageCount,
        amount: parsed.amount,
      }
    }
  }

  function createExportFn(endpoint: string, filename: string) {
    return async (model: Record<string, any>) => {
      isExporting.value = true
      try {
        const response = await $axios.post(endpoint, model, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
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
  }

  const isValidateFetcher = createFetcher('/statistics/is-validate')
  const toValidateFetcher = createFetcher('/statistics/to-validate')
  const toCanceledFetcher = createFetcher('/statistics/to-canceled')

  function createExpiredFetcher(action: 'before' | 'after') {
    return createFetcher('/statistics/is-expired', () => ({ action }))
  }

  const exportIsValidate = createExportFn('/statistics/is-validate', 'payment_valider.xlsx')
  const exportToValidate = createExportFn('/statistics/to-validate', 'payment_a_valider.xlsx')
  const exportToCanceled = createExportFn('/statistics/to-canceled', 'payment_annuler.xlsx')

  function createExportExpired(action: 'before' | 'after') {
    const filename = action === 'before'
      ? 'payment_expirer_avant_validation.xlsx'
      : 'payment_expirer_apres_validation.xlsx'
    return createExportFn('/statistics/is-expired', filename)
  }

  return {
    isExporting,
    isValidateFetcher,
    toValidateFetcher,
    toCanceledFetcher,
    createExpiredFetcher,
    exportIsValidate,
    exportToValidate,
    exportToCanceled,
    createExportExpired,
  }
}
