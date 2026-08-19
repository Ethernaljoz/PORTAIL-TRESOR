import type { Role, Permission } from '~/types/tresor'

export const allPermissions: Permission[] = [
  { id: 'p-01', module: 'Institutions', action: 'read', label: 'Consulter les institutions' },
  { id: 'p-02', module: 'Institutions', action: 'write', label: 'Créer/modifier les institutions' },
  { id: 'p-03', module: 'Institutions', action: 'delete', label: 'Supprimer les institutions' },
  { id: 'p-04', module: 'Services', action: 'read', label: 'Consulter les services' },
  { id: 'p-05', module: 'Services', action: 'write', label: 'Créer/modifier les services' },
  { id: 'p-06', module: 'Services', action: 'delete', label: 'Supprimer les services' },
  { id: 'p-07', module: 'Transactions', action: 'read', label: 'Consulter les transactions' },
  { id: 'p-08', module: 'Transactions', action: 'write', label: 'Initier des transactions' },
  { id: 'p-09', module: 'Transactions', action: 'cancel', label: 'Annuler des transactions' },
  { id: 'p-10', module: 'Paiements', action: 'read', label: 'Consulter les paiements' },
  { id: 'p-11', module: 'Paiements', action: 'validate', label: 'Valider les paiements' },
  { id: 'p-12', module: 'Paiements', action: 'reject', label: 'Rejeter les paiements' },
  { id: 'p-13', module: 'Utilisateurs', action: 'read', label: 'Consulter les utilisateurs' },
  { id: 'p-14', module: 'Utilisateurs', action: 'write', label: 'Créer/modifier les utilisateurs' },
  { id: 'p-15', module: 'Utilisateurs', action: 'delete', label: 'Supprimer les utilisateurs' },
  { id: 'p-16', module: 'Alias', action: 'read', label: 'Consulter les alias' },
  { id: 'p-17', module: 'Alias', action: 'write', label: 'Créer/modifier les alias' },
  { id: 'p-18', module: 'Rapports', action: 'read', label: 'Consulter les rapports' },
  { id: 'p-19', module: 'Rapports', action: 'export', label: 'Exporter les rapports' },
  { id: 'p-20', module: 'Paramètres', action: 'read', label: 'Consulter les paramètres' },
  { id: 'p-21', module: 'Paramètres', action: 'write', label: 'Modifier les paramètres' },
]

export const mockRoles: Role[] = [
  { id: 'r-01', nom: 'Administrateur', description: 'Accès complet à toutes les fonctionnalités de la plateforme', nbUtilisateurs: 1, permissions: allPermissions.map(p => p.id), statut: 'Actif' },
  { id: 'r-02', nom: 'Superviseur', description: 'Supervision des opérations et validation des paiements', nbUtilisateurs: 1, permissions: ['p-01', 'p-04', 'p-05', 'p-07', 'p-08', 'p-10', 'p-11', 'p-12', 'p-13', 'p-16', 'p-17', 'p-18', 'p-19'], statut: 'Actif' },
  { id: 'r-03', nom: 'Gestionnaire', description: 'Gestion quotidienne des services et transactions', nbUtilisateurs: 3, permissions: ['p-01', 'p-04', 'p-05', 'p-07', 'p-08', 'p-10', 'p-11', 'p-13', 'p-16', 'p-17'], statut: 'Actif' },
  { id: 'r-04', nom: 'Opérateur', description: 'Exécution des opérations de base', nbUtilisateurs: 2, permissions: ['p-01', 'p-04', 'p-07', 'p-10', 'p-16'], statut: 'Actif' },
  { id: 'r-05', nom: 'Lecteur', description: 'Consultation uniquement des données', nbUtilisateurs: 1, permissions: ['p-01', 'p-04', 'p-07', 'p-10', 'p-18'], statut: 'Actif' },
]
