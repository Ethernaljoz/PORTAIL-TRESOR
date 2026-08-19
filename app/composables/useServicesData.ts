import { shallowRef } from 'vue'
import { mockServices, mockAlias } from '~~/sample-data-mock'
import type { Service, Alias } from '~/types/tresor'

export function useServicesData() {
  const services = shallowRef<Service[]>(mockServices)
  const alias = shallowRef<Alias[]>(mockAlias)
  return { services, alias }
}
