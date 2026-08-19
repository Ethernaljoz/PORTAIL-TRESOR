import { shallowRef } from 'vue'
import { mockAudit } from '~~/sample-data-mock'
import type { AuditEntry } from '~/types/tresor'

export function useAuditData() {
  const audit = shallowRef<AuditEntry[]>(mockAudit)
  return { audit }
}
