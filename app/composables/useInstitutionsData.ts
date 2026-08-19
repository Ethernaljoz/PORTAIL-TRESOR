import { shallowRef } from 'vue'
import { mockInstitutions, mockEnrolements } from '~~/sample-data-mock'
import type { Institution, Enrolement } from '~/types/tresor'

export function useInstitutionsData() {
  const institutions = shallowRef<Institution[]>(mockInstitutions)
  const enrolements = shallowRef<Enrolement[]>(mockEnrolements)
  return { institutions, enrolements }
}
