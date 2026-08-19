import { shallowRef } from 'vue'
import { mockStructure, mockComptes, mockReconciliation, mockTransferts } from '~~/sample-data-mock'
import type { Structure, Compte, Reconciliation, Transfert } from '~/types/tresor'

export function useStructureData() {
  const structure = shallowRef<Structure[]>(mockStructure)
  const comptes = shallowRef<Compte[]>(mockComptes)
  const reconciliation = shallowRef<Reconciliation[]>(mockReconciliation)
  const transferts = shallowRef<Transfert[]>(mockTransferts)
  return { structure, comptes, reconciliation, transferts }
}
