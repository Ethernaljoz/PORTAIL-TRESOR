export interface Institution {
  id: string
  nom: string
  type: string
  nbServices: number
  nbAlias: number
  nbTransactions: number
  statut: string
  dateEnrolement: string
}

export interface Service {
  id: string
  nom: string
  institution: string
  institutionId: string
  type: string
  description: string
  alias: string
  aliasId: string
  statut: string
  nbTransactions: number
  dateCreation: string
}

export interface Alias {
  id: string
  nom: string
  type: string
  institution: string
  institutionId: string
  service: string
  serviceId: string
  compte: string
  nbTransactions: number
  statut: string
  creeLe: string
}

export interface Compte {
  numero: string
  type: string
  libelle: string
  solde: number
  soldeDisponible: number
  statut: string
  derniereMAJ: string
}

export interface AuditEntry {
  id: string
  date: string
  utilisateur: string
  action: string
  objet: string
  resultat: string
  ip: string
  etatAvant?: string
  etatApres?: string
}

export interface PaiementRecu {
  id: string
  payeur: string
  pspPayeur: string
  institution: string
  institutionId: string
  service: string
  alias: string
  montant: number
  reference: string
  statut: string
  date: string
}

export interface PaiementEnvoye {
  id: string
  beneficiaire: string
  pspBeneficiaire: string
  motif: string
  institution: string
  montant: number
  reference: string
  statut: string
  date: string
}

export interface DemandePaiement {
  reference: string
  type: string
  institution: string
  usager: string
  montant: number
  echeance: string
  statut: string
  date: string
}

export interface PaiementMasse {
  instructionId: string
  type: string
  initiateur: string
  nombre: number
  montantTotal: number
  succes: number
  echecs: number
  statut: string
  date: string
}

export interface RetourFond {
  reference: string
  transactionInitiale: string
  montant: number
  payeur: string
  beneficiaire: string
  institution: string
  alias: string
  motif: string
  statut: string
  date: string
}

export interface Transaction {
  id: string
  type: string
  source: string
  sourceId: string
  destination: string
  destinationId: string
  montant: number
  devise: string
  statut: string
  reference: string
  description: string
  dateInitiation: string
  dateConfirmation: string | null
  psp: string
}

export interface Enrolement {
  id: string
  institution: string
  typeInstitution: string
  demandeur: string
  email: string
  telephone: string
  servicesDemandes: number
  statut: string
  dateDemande: string
  dateTraitement: string | null
  motif: string
}

export interface Utilisateur {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  role: string
  roleId: string
  institution: string
  institutionId: string
  statut: string
  derniereConnexion: string
  dateCreation: string
}

export interface Role {
  id: string
  nom: string
  description: string
  nbUtilisateurs: number
  permissions: string[]
  statut: string
}

export interface Permission {
  id: string
  module: string
  action: string
  label: string
}

export interface Reconciliation {
  id: string
  periode: string
  institution: string
  nbTransactionsTotales: number
  nbReconcilies: number
  nbAnomalies: number
  montantTotal: number
  montantReconcilie: number
  statut: string
  dateExecution: string
}

export interface Transfert {
  id: string
  source: string
  destination: string
  montant: number
  motif: string
  statut: string
  dateInitiation: string
  dateExecution: string | null
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  titre: string
  message: string
  destinataire: string
  lue: boolean
  date: string
  source: string
}

export interface Structure {
  id: string
  nom: string
  type: string
  parent: string | null
  responsable: string
  nbUtilisateurs: number
  nbServices: number
  statut: string
}

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
