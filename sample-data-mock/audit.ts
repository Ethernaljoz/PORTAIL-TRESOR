import type { AuditEntry } from '~/types/tresor'

export const mockAudit: AuditEntry[] = [
  { id: 'au1', date: '19/08 08:15', utilisateur: 'Koffi Mensah', action: 'Création alias', objet: 'OTR-IMPOTS', resultat: 'Succès', ip: '10.0.0.12' },
  { id: 'au2', date: '19/08 08:20', utilisateur: 'Afi Doe', action: 'Validation demande', objet: 'DEM-2026-002', resultat: 'Succès', ip: '10.0.0.18' },
  { id: 'au3', date: '19/08 08:25', utilisateur: 'Koffi Mensah', action: 'Modification rôle', objet: 'u-025', resultat: 'Succès', ip: '10.0.0.12', etatAvant: 'Gestionnaire', etatApres: 'Superviseur' },
  { id: 'au4', date: '19/08 08:30', utilisateur: 'Yawa Kossi', action: 'Connexion', objet: 'Système', resultat: 'Succès', ip: '10.0.0.22' },
  { id: 'au5', date: '19/08 08:35', utilisateur: 'Komlan Agbo', action: 'Création service', objet: 'Impôts', resultat: 'Succès', ip: '10.0.0.15' },
  { id: 'au6', date: '19/08 08:40', utilisateur: 'Koko Akakpo', action: 'Connexion', objet: 'Système', resultat: 'Échec', ip: '10.0.0.30' },
  { id: 'au7', date: '19/08 08:45', utilisateur: 'Dodji Folly', action: 'Export transactions', objet: 'Transactions 18/08', resultat: 'Succès', ip: '10.0.0.25' },
  { id: 'au8', date: '18/08 17:30', utilisateur: 'Koffi Mensah', action: 'Désactivation utilisateur', objet: 'u-028', resultat: 'Succès', ip: '10.0.0.12', etatAvant: 'Actif', etatApres: 'Inactif' },
  { id: 'au9', date: '18/08 17:00', utilisateur: 'Afi Doe', action: 'Rejet demande', objet: 'DEM-2026-003', resultat: 'Succès', ip: '10.0.0.18', etatAvant: 'En attente', etatApres: 'Rejetée' },
  { id: 'au10', date: '18/08 16:30', utilisateur: 'Yawa Kossi', action: 'Approbation enrôlement', objet: 'DEM-2026-004', resultat: 'Succès', ip: '10.0.0.22', etatAvant: 'En attente', etatApres: 'Approuvée' },
  { id: 'au11', date: '18/08 16:00', utilisateur: 'Koffi Mensah', action: 'Création institution', objet: 'DGDA', resultat: 'Succès', ip: '10.0.0.12' },
  { id: 'au12', date: '18/08 15:30', utilisateur: 'Dodji Folly', action: 'Initiation transfert', objet: 'TRF-2026-00001', resultat: 'Succès', ip: '10.0.0.25' },
  { id: 'au13', date: '18/08 15:00', utilisateur: 'Komlan Agbo', action: 'Modification alias', objet: 'OTR-DOUANES', resultat: 'Succès', ip: '10.0.0.15', etatAvant: 'Inactif', etatApres: 'Actif' },
  { id: 'au14', date: '18/08 14:30', utilisateur: 'Afi Doe', action: 'Génération rapport', objet: 'Rapport transactions 17/08', resultat: 'Succès', ip: '10.0.0.18' },
  { id: 'au15', date: '18/08 14:00', utilisateur: 'Koffi Mensah', action: 'Réinitialisation accès', objet: 'u-015', resultat: 'Succès', ip: '10.0.0.12' },
]
