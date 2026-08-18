import { DOC_SECTIONS } from '~/constants/mock-data'
import { MOCK_ENDPOINTS } from '~/constants/mock-data'

export function useDocs() {
  const sections = DOC_SECTIONS
  const endpoints = MOCK_ENDPOINTS

  const categories = computed(() => {
    const cats = new Set(endpoints.map(e => e.category))
    return Array.from(cats)
  })

  function getEndpointsByCategory(category: string) {
    return endpoints.filter(e => e.category === category)
  }

  function getEndpointById(id: string) {
    return endpoints.find(e => e.id === id)
  }

  return {
    sections,
    endpoints,
    categories,
    getEndpointsByCategory,
    getEndpointById,
  }
}
