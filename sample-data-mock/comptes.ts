import type { Compte } from '~/types/tresor'

export const mockComptes: Compte[] = [
  {
    numero: '000001-SAC',
    type: 'Règlement',
    libelle: 'Compte de règlement Trésor',
    solde: 12450000000,
    soldeDisponible: 12000000000,
    statut: 'Actif',
    derniereMAJ: '08:15',
  },
  {
    numero: '000001-TASC',
    type: 'Réserve PI',
    libelle: 'Compte de réserve PI',
    solde: 4250000000,
    soldeDisponible: 4100000000,
    statut: 'Actif',
    derniereMAJ: '08:15',
  },
]
