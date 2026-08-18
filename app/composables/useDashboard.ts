import { useQuery } from '@tanstack/vue-query'

interface DashboardStats {
  new: number
  validate: number
  canceled: number
  amount: number
  moov: number
  mtn: number
}

interface DonutData {
  series: number[]
  labels: string[]
}

interface MonthlyData {
  name: string
  data: number[]
}

export function useDashboard() {
  const { $axios } = useNuxtApp()

  const statsQuery = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await $axios.get<DashboardStats>('/dashboard/stats')
      return data
    },
  })

  const donutQuery = useQuery({
    queryKey: ['dashboard', 'donut'],
    queryFn: async () => {
      const { data } = await $axios.get<DonutData>('/dashboard/stats/top')
      return data
    },
  })

  const monthlyQuery = useQuery({
    queryKey: ['dashboard', 'monthly'],
    queryFn: async () => {
      const { data } = await $axios.get<MonthlyData[]>('/dashboard/stats/specialities')
      return data
    },
  })

  return {
    stats: computed(() => statsQuery.data?.value ?? null),
    donut: computed(() => donutQuery.data?.value ?? null),
    monthly: computed(() => monthlyQuery.data?.value ?? null),
    loading: computed(() => statsQuery.isPending.value || donutQuery.isPending.value || monthlyQuery.isPending.value),
    loadingStats: computed(() => statsQuery.isPending.value),
    loadingDonut: computed(() => donutQuery.isPending.value),
    loadingMonthly: computed(() => monthlyQuery.isPending.value),
    refresh: async () => {
      await Promise.all([
        statsQuery.refetch(),
        donutQuery.refetch(),
        monthlyQuery.refetch(),
      ])
    },
  }
}
