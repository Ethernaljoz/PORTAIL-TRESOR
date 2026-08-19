import type { Notification } from '~/types/tresor'

export const mockNotifications: Notification[] = [
  { id: 'n-001', type: 'warning', titre: 'Reconciliation en anomalie', message: '5 anomalies détectées pour la période du 19/08/2026 - OTR', destinataire: 'Administrateur', lue: false, date: '19/08/2026 09:30', source: 'Système de réconciliation' },
  { id: 'n-002', type: 'success', titre: 'Enrôlement approuvé', message: 'L\'enrôlement de la Direction des Transports est en attente de validation', destinataire: 'Superviseur', lue: false, date: '19/08/2026 08:45', source: 'Module enrôlement' },
  { id: 'n-003', type: 'error', titre: 'Transaction échouée', message: 'Le paiement de bourse BOU-2026-00012 a échoué (solde insuffisant)', destinataire: 'Administrateur', lue: false, date: '18/08/2026 15:35', source: 'Module paiements' },
  { id: 'n-004', type: 'info', titre: 'Nouvel utilisateur', message: 'Suru Kpatar a demandé un accès en tant que Gestionnaire', destinataire: 'Administrateur', lue: true, date: '18/08/2026 12:00', source: 'Module utilisateurs' },
  { id: 'n-005', type: 'success', titre: 'Transfert exécuté', message: 'Le virement de 25 000 000 XOF OTR-IMPOTS vers le compte Trésor a été exécuté', destinataire: 'Tous', lue: true, date: '18/08/2026 09:15', source: 'Module transferts' },
  { id: 'n-006', type: 'warning', titre: 'Paiement en attente', message: '3 paiements sont en attente de validation depuis plus de 24h', destinataire: 'Superviseur', lue: true, date: '17/08/2026 18:00', source: 'Module paiements' },
  { id: 'n-007', type: 'info', titre: 'Rapport généré', message: 'Le rapport mensuel de transactions d\'août 2026 est disponible', destinataire: 'Tous', lue: true, date: '17/08/2026 14:30', source: 'Module rapports' },
  { id: 'n-008', type: 'error', titre: 'Connexion échouée', message: 'Tentative de connexion échouée pour l\'utilisateur Koko Akakpo depuis 10.0.0.30', destinataire: 'Administrateur', lue: true, date: '17/08/2026 08:40', source: 'Module sécurité' },
]
