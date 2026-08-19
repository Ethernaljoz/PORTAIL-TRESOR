import type { PaiementRecu, PaiementEnvoye, DemandePaiement, PaiementMasse, RetourFond } from '~/types/tresor'

export const mockPaiementsRecus: PaiementRecu[] = [
  { id: 'PR-001', payeur: 'Jean Dupont', pspPayeur: 'PSP Bank 01', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Impôts', alias: 'OTR-IMPOTS', montant: 250000, reference: 'IMP-2026-00045', statut: 'Réussi', date: '19/08/2026 08:12' },
  { id: 'PR-002', payeur: 'Komlan Agbo', pspPayeur: 'PSP Bank 02', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Douanes', alias: 'OTR-DOUANES', montant: 1500000, reference: 'DOU-2026-00234', statut: 'Réussi', date: '19/08/2026 08:05' },
  { id: 'PR-003', payeur: 'Afi Doe', pspPayeur: 'PSP Mobile 01', institution: 'Port Autonome de Lomé', institutionId: 'pal', service: 'Droits portuaires', alias: 'PAL-DROITS', montant: 780000, reference: 'PAL-2026-00089', statut: 'En attente', date: '19/08/2026 08:09' },
  { id: 'PR-004', payeur: 'Abra Sitsofi', pspPayeur: 'PSP Mobile 01', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Amendes', alias: 'OTR-AMENDES', montant: 320000, reference: 'AME-2026-00034', statut: 'Réussi', date: '19/08/2026 07:55' },
  { id: 'PR-005', payeur: 'Suru Kpatar', pspPayeur: 'PSP Bank 01', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Impôts', alias: 'OTR-IMPOTS', montant: 680000, reference: 'IMP-2026-00056', statut: 'Réussi', date: '19/08/2026 07:30' },
  { id: 'PR-006', payeur: 'Dodji Folly', pspPayeur: 'PSP Bank 02', institution: 'Port Autonome de Lomé', institutionId: 'pal', service: 'Loyers domaniaux', alias: 'PAL-LOYERS', montant: 890000, reference: 'PAL-2026-00156', statut: 'Réussi', date: '19/08/2026 07:40' },
]

export const mockPaiementsEnvoyes: PaiementEnvoye[] = [
  { id: 'PE-001', beneficiaire: 'Koffi Mensah', pspBeneficiaire: 'PSP Bank 02', motif: 'Salaires', institution: 'Direction Générale des Douanes', montant: 1250000, reference: 'SAL-2026-08-012', statut: 'Réussi', date: '19/08/2026 08:11' },
  { id: 'PE-002', beneficiaire: 'Yawa Kossi', pspBeneficiaire: 'PSP Mobile 02', motif: 'Pension retraite', institution: 'Caisse de Retraites du Togo', montant: 350000, reference: 'RET-2026-00067', statut: 'Réussi', date: '19/08/2026 08:02' },
  { id: 'PE-003', beneficiaire: 'Koko Akakpo', pspBeneficiaire: 'PSP Mobile 02', motif: 'Pension retraite', institution: 'Caisse de Retraites du Togo', montant: 275000, reference: 'RET-2026-00078', statut: 'En attente', date: '19/08/2026 07:35' },
  { id: 'PE-004', beneficiaire: 'Koffi Mensah', pspBeneficiaire: 'PSP Mobile 01', motif: 'Bourse universitaire', institution: 'Ministère de la Fonction Publique', montant: 850000, reference: 'BOU-2026-00012', statut: 'Réussi', date: '18/08/2026 17:30' },
  { id: 'PE-005', beneficiaire: 'Yawa Kossi', pspBeneficiaire: 'PSP Bank 02', motif: 'Salaires', institution: 'Direction Générale des Douanes', montant: 1800000, reference: 'SAL-2026-08-015', statut: 'Réussi', date: '18/08/2026 16:30' },
]

export const mockDemandesPaiement: DemandePaiement[] = [
  { reference: 'RTP-001', type: 'Impôt', institution: 'Office Togolais des Recettes', usager: 'Jean Dupont', montant: 250000, echeance: '20/08/2026', statut: 'En attente', date: '19/08/2026' },
  { reference: 'RTP-002', type: 'Amende', institution: 'Office Togolais des Recettes', usager: 'Koffi Mensah', montant: 50000, echeance: '19/08/2026', statut: 'Réussi', date: '19/08/2026' },
  { reference: 'RTP-003', type: 'Taxe', institution: 'Port Autonome de Lomé', usager: 'Afi Doe', montant: 120000, echeance: '21/08/2026', statut: 'En attente', date: '18/08/2026' },
  { reference: 'RTP-004', type: 'Impôt', institution: 'Office Togolais des Recettes', usager: 'Komlan Agbo', montant: 180000, echeance: '22/08/2026', statut: 'En attente', date: '18/08/2026' },
  { reference: 'RTP-005', type: 'Droit', institution: 'Port Autonome de Lomé', usager: 'Yawa Kossi', montant: 350000, echeance: '18/08/2026', statut: 'Expiré', date: '15/08/2026' },
  { reference: 'RTP-006', type: 'Amende', institution: 'Office Togolais des Recettes', usager: 'Kossi Ameka', montant: 75000, echeance: '19/08/2026', statut: 'Rejeté', date: '17/08/2026' },
]

export const mockPaiementsMasse: PaiementMasse[] = [
  { instructionId: 'SALAIRES-2026-08-1', type: 'Salaires', initiateur: 'Application paie', nombre: 12540, montantTotal: 8450000000, succes: 12320, echecs: 180, statut: 'Terminé', date: '18/08/2026 06:00' },
  { instructionId: 'FOURN-2026-08-2', type: 'Fournisseurs', initiateur: 'Comptabilité', nombre: 850, montantTotal: 1250000000, succes: 840, echecs: 10, statut: 'Terminé', date: '17/08/2026 14:00' },
  { instructionId: 'PENSIONS-2026-08-3', type: 'Pensions', initiateur: 'Caisse de Retraites', nombre: 3200, montantTotal: 2100000000, succes: 3150, echecs: 50, statut: 'Terminé', date: '16/08/2026 08:00' },
]

export const mockRetoursFonds: RetourFond[] = [
  { reference: 'RF-001', transactionInitiale: 'TX-20260819-000006', montant: 450000, payeur: 'Kossi Ameka', beneficiaire: 'Trésor Public', institution: 'Office Togolais des Recettes', alias: 'OTR-TAXES', motif: 'Transaction rejetée par le PSP', statut: 'Exécutée', date: '19/08/2026 09:00' },
  { reference: 'RF-002', transactionInitiale: 'TX-20260818-000015', montant: 560000, payeur: 'Komlan Agbo', beneficiaire: 'Trésor Public', institution: 'Office Togolais des Recettes', alias: 'OTR-TAXES', motif: 'Annulation demandée par le payeur', statut: 'En cours', date: '18/08/2026 17:00' },
  { reference: 'RF-003', transactionInitiale: 'TX-20260817-000008', montant: 120000, payeur: 'Yawa Kossi', beneficiaire: 'Trésor Public', institution: 'Port Autonome de Lomé', alias: 'PAL-DROITS', motif: 'Doublon détecté', statut: 'Demandée', date: '17/08/2026 15:00' },
]
