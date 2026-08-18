import type { ColumnFiltersState } from '@tanstack/vue-table'
import type { FetchParams, FetchResult } from '~/composables/useServerDataTable'
import type { LogEntry } from '~/types/log'

export function useLogs() {
  const { $axios } = useNuxtApp()

  const agents = ref<{ id: number, name: string }[]>([])
  const isExporting = ref(false)

  async function loadAgents() {
    try {
      const { data } = await $axios.get('/users/agent')
      agents.value = data || []
    }
    catch {
      agents.value = []
    }
  }

  function extractFilter(filters: ColumnFiltersState, id: string): string {
    const f = filters.find(item => item.id === id)
    return f ? String(f.value) : ''
  }

  const fetcher = async (params: FetchParams): Promise<FetchResult<LogEntry>> => {
    const agent = extractFilter(params.filters, 'agent')
    const code = extractFilter(params.filters, 'code')
    const date_debut = extractFilter(params.filters, 'date_debut')
    const date_fin = extractFilter(params.filters, 'date_fin')

    const { data } = await $axios.get('/activities', {
      params: {
        page: params.page + 1,
        size: params.pageSize,
        agent: agent || undefined,
        code: code || undefined,
        date_debut: date_debut || undefined,
        date_fin: date_fin || undefined,
      },
    })

    return {
      data: data.data || [],
      total: data.total || data.data?.length || 0,
      pageCount: data.last_page || 1,
    }
  }

  async function exportLogs(model: Record<string, any>) {
    isExporting.value = true
    try {
      const response = await $axios.post('/activities/export', model, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'logs.xlsx')
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
    agents,
    isExporting,
    loadAgents,
    fetcher,
    exportLogs,
  }
}
