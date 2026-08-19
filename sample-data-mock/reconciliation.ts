import type { Reconciliation, Transfert } from '~/types/tresor'

export const mockReconciliation: Reconciliation[] = [
  { id: 'REC-001', periode: '19/08/2026', institution: 'Office Togolais des Recettes', nbTransactionsTotales: 320, nbReconcilies: 315, nbAnomalies: 5, montantTotal: 425000000, montantReconcilie: 420000000, statut: 'En cours', dateExecution: '19/08/2026 06:00' },
  { id: 'REC-002', periode: '18/08/2026', institution: 'Office Togolais des Recettes', nbTransactionsTotales: 298, nbReconcilies: 295, nbAnomalies: 3, montantTotal: 380000000, montantReconcilie: 378500000, statut: 'Terminé', dateExecution: '18/08/2026 06:00' },
  { id: 'REC-003', periode: '18/08/2026', institution: 'Port Autonome de Lomé', nbTransactionsTotales: 85, nbReconcilies: 84, nbAnomalies: 1, montantTotal: 125000000, montantReconcilie: 124000000, statut: 'Terminé', dateExecution: '18/08/2026 06:30' },
  { id: 'REC-004', periode: '17/08/2026', institution: 'Caisse de Retraites du Togo', nbTransactionsTotales: 120, nbReconcilies: 118, nbAnomalies: 2, montantTotal: 89000000, montantReconcilie: 88500000, statut: 'Terminé', dateExecution: '17/08/2026 07:00' },
  { id: 'REC-005', periode: '17/08/2026', institution: 'Direction Générale des Douanes', nbTransactionsTotales: 65, nbReconcilies: 65, nbAnomalies: 0, montantTotal: 210000000, montantReconcilie: 210000000, statut: 'Terminé', dateExecution: '17/08/2026 06:15' },
  { id: 'REC-006', periode: '16/08/2026', institution: 'Office Togolais des Recettes', nbTransactionsTotales: 310, nbReconcilies: 302, nbAnomalies: 8, montantTotal: 445000000, montantReconcilie: 438000000, statut: 'Terminé', dateExecution: '16/08/2026 06:00' },
]

export const mockTransferts: Transfert[] = [
  { id: 'TRF-001', source: 'OTR-IMPOTS', destination: 'Compte de règlement Trésor', montant: 25000000, motif: 'Virement recettes quotidiennes', statut: 'Exécuté', dateInitiation: '19/08/2026 09:00', dateExecution: '19/08/2026 09:15' },
  { id: 'TRF-002', source: 'OTR-DOUANES', destination: 'Compte de règlement Trésor', montant: 18500000, motif: 'Virement droits de douane', statut: 'Exécuté', dateInitiation: '19/08/2026 08:30', dateExecution: '19/08/2026 08:45' },
  { id: 'TRF-003', source: 'Compte de réserve PI', destination: 'CRT-RETRAITES', montant: 35000000, motif: 'Alimentation pensions août', statut: 'En cours', dateInitiation: '19/08/2026 10:00', dateExecution: null },
  { id: 'TRF-004', source: 'Compte de réserve PI', destination: 'DGT-SALAIRES', montant: 125000000, motif: 'Salaires août douanes', statut: 'Planifié', dateInitiation: '19/08/2026 11:00', dateExecution: null },
  { id: 'TRF-005', source: 'OTR-TAXES', destination: 'Compte de règlement Trésor', montant: 8200000, motif: 'Virement taxes quotidiennes', statut: 'Exécuté', dateInitiation: '18/08/2026 17:00', dateExecution: '18/08/2026 17:10' },
  { id: 'TRF-006', source: 'PAL-DROITS', destination: 'Compte de règlement Trésor', montant: 12800000, motif: 'Virement droits portuaires', statut: 'Exécuté', dateInitiation: '18/08/2026 16:00', dateExecution: '18/08/2026 16:20' },
]
