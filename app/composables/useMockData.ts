import {
  MOCK_API_KEYS,
  MOCK_APPS,
  MOCK_ENDPOINTS,
  MOCK_LOGS,
  MOCK_STATS,
} from '~/constants/mock-data'
import type {
  MockApiKey,
  MockApp,
  MockLogEntry,
  MockStats,
} from '~/types/platform'

export function useMockData() {
  const stats = ref<MockStats>(MOCK_STATS)
  const apps = ref<MockApp[]>(MOCK_APPS)
  const apiKeys = ref<MockApiKey[]>(MOCK_API_KEYS)
  const logs = ref<MockLogEntry[]>(MOCK_LOGS)

  const endpoints = MOCK_ENDPOINTS

  const totalRequests = computed(() => stats.value.totalRequests)
  const successRate = computed(() => stats.value.successRate)
  const avgLatency = computed(() => stats.value.avgLatency)
  const activeApps = computed(() => apps.value.filter(a => a.status === 'active').length)
  const activeKeys = computed(() => apiKeys.value.filter(k => k.status === 'active').length)

  return {
    stats,
    apps,
    apiKeys,
    logs,
    endpoints,
    totalRequests,
    successRate,
    avgLatency,
    activeApps,
    activeKeys,
  }
}
