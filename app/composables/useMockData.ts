import {
  mockInstitutions,
  mockServices,
  mockAlias,
  mockTransactions,
  mockComptes,
  mockEnrolements,
  mockUtilisateurs,
  mockRoles,
  allPermissions,
  mockAudit,
  mockPaiementsRecus,
  mockPaiementsEnvoyes,
  mockDemandesPaiement,
  mockPaiementsMasse,
  mockRetoursFonds,
  mockReconciliation,
  mockTransferts,
  mockRapports,
  mockNotifications,
  mockStructure,
} from '~~/sample-data-mock'

import type {
  Institution,
  Service,
  Alias,
  Transaction,
  Compte,
  Enrolement,
  Utilisateur,
  Role,
  Permission,
  AuditEntry,
  PaiementRecu,
  PaiementEnvoye,
  DemandePaiement,
  PaiementMasse,
  RetourFond,
  Reconciliation,
  Transfert,
  Notification,
  Structure,
} from '~/types/tresor'

export function useMockData() {
  const institutions = ref<Institution[]>(mockInstitutions)
  const services = ref<Service[]>(mockServices)
  const alias = ref<Alias[]>(mockAlias)
  const transactions = ref<Transaction[]>(mockTransactions)
  const comptes = ref<Compte[]>(mockComptes)
  const enrolements = ref<Enrolement[]>(mockEnrolements)
  const utilisateurs = ref<Utilisateur[]>(mockUtilisateurs)
  const roles = ref<Role[]>(mockRoles)
  const permissions = ref<Permission[]>(allPermissions)
  const audit = ref<AuditEntry[]>(mockAudit)
  const paiementsRecus = ref<PaiementRecu[]>(mockPaiementsRecus)
  const paiementsEnvoyes = ref<PaiementEnvoye[]>(mockPaiementsEnvoyes)
  const demandesPaiement = ref<DemandePaiement[]>(mockDemandesPaiement)
  const paiementsMasse = ref<PaiementMasse[]>(mockPaiementsMasse)
  const retoursFonds = ref<RetourFond[]>(mockRetoursFonds)
  const reconciliation = ref<Reconciliation[]>(mockReconciliation)
  const transferts = ref<Transfert[]>(mockTransferts)
  const rapports = ref(mockRapports)
  const notifications = ref<Notification[]>(mockNotifications)
  const structure = ref<Structure[]>(mockStructure)

  const totalInstitutions = computed(() => institutions.value.length)
  const activeInstitutions = computed(() => institutions.value.filter(i => i.statut === 'Active').length)
  const totalTransactions = computed(() => transactions.value.length)
  const totalMontant = computed(() => transactions.value.reduce((sum, t) => sum + t.montant, 0))
  const transactionsReussies = computed(() => transactions.value.filter(t => t.statut === 'Réussi').length)
  const unreadNotifications = computed(() => notifications.value.filter(n => !n.lue).length)

  return {
    institutions,
    services,
    alias,
    transactions,
    comptes,
    enrolements,
    utilisateurs,
    roles,
    permissions,
    audit,
    paiementsRecus,
    paiementsEnvoyes,
    demandesPaiement,
    paiementsMasse,
    retoursFonds,
    reconciliation,
    transferts,
    rapports,
    notifications,
    structure,
    totalInstitutions,
    activeInstitutions,
    totalTransactions,
    totalMontant,
    transactionsReussies,
    unreadNotifications,
  }
}
