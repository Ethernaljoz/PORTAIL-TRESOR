import { shallowRef } from 'vue'
import { mockTransactions, mockPaiementsRecus, mockPaiementsEnvoyes, mockDemandesPaiement, mockPaiementsMasse, mockRetoursFonds } from '~~/sample-data-mock'
import type { Transaction, PaiementRecu, PaiementEnvoye, DemandePaiement, PaiementMasse, RetourFond } from '~/types/tresor'

export function useTransactionsData() {
  const transactions = shallowRef<Transaction[]>(mockTransactions)
  const paiementsRecus = shallowRef<PaiementRecu[]>(mockPaiementsRecus)
  const paiementsEnvoyes = shallowRef<PaiementEnvoye[]>(mockPaiementsEnvoyes)
  const demandesPaiement = shallowRef<DemandePaiement[]>(mockDemandesPaiement)
  const paiementsMasse = shallowRef<PaiementMasse[]>(mockPaiementsMasse)
  const retoursFonds = shallowRef<RetourFond[]>(mockRetoursFonds)
  return { transactions, paiementsRecus, paiementsEnvoyes, demandesPaiement, paiementsMasse, retoursFonds }
}
