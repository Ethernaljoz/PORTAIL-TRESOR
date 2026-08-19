export interface Rapport {
  id: string
  titre: string
  description: string
  dateGenere: string
  periode: string
  institution: string
  nbTransactions: number
  montantTotal: number
  tauxReussite: number
  type: string
}

export const mockRapports: Rapport[] = [
  { id: 'RAP-2026-001', titre: 'Rapport mensuel transactions', description: 'Synthese complete des transactions du mois d\'aout 2026', dateGenere: '19/08/2026', periode: 'Aout 2026', institution: 'Toutes', nbTransactions: 1247, montantTotal: 485000000, tauxReussite: 98.2, type: 'Mensuel' },
  { id: 'RAP-2026-002', titre: 'Rapport trimestriel OTR', description: 'Performance OTR Q3 2026', dateGenere: '18/08/2026', periode: 'Q3 2026', institution: 'OTR', nbTransactions: 423, montantTotal: 198000000, tauxReussite: 97.1, type: 'Trimestriel' },
  { id: 'RAP-2026-003', titre: 'Rapport anomalies et retards', description: 'Analyse des transactions en anomalie', dateGenere: '17/08/2026', periode: '15-17 Aout 2026', institution: 'Toutes', nbTransactions: 34, montantTotal: 22000000, tauxReussite: 0, type: 'Ad hoc' },
  { id: 'RAP-2026-004', titre: 'Rapport CBCA transactions', description: 'Detail des operations CBCA', dateGenere: '16/08/2026', periode: 'Aout 2026', institution: 'CBCA', nbTransactions: 189, montantTotal: 67500000, tauxReussite: 99.5, type: 'Mensuel' },
  { id: 'RAP-2026-005', titre: 'Reconciliation mensuelle', description: 'Synthese de la reconciliation Aout 2026', dateGenere: '15/08/2026', periode: 'Aout 2026', institution: 'Toutes', nbTransactions: 1100, montantTotal: 412000000, tauxReussite: 97.8, type: 'Mensuel' },
  { id: 'RAP-2026-006', titre: 'Rapport CADET performances', description: 'Suivi des performances CADET', dateGenere: '14/08/2026', periode: 'Aout 2026', institution: 'CADET', nbTransactions: 312, montantTotal: 89000000, tauxReussite: 96.3, type: 'Mensuel' },
  { id: 'RAP-2026-007', titre: 'Rapport DGID recettes', description: 'Recettes DGID du mois', dateGenere: '13/08/2026', periode: 'Aout 2026', institution: 'DGID', nbTransactions: 567, montantTotal: 312000000, tauxReussite: 99.1, type: 'Mensuel' },
  { id: 'RAP-2026-008', titre: 'Rapport hebdomadaire repos', description: 'Resume hebdomadaire de tous les repos', dateGenere: '12/08/2026', periode: 'S32 2026', institution: 'Toutes', nbTransactions: 298, montantTotal: 145000000, tauxReussite: 98.7, type: 'Hebdomadaire' },
]
