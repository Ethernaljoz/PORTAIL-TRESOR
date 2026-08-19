import type { Alias } from '~/types/tresor'

export const mockAlias: Alias[] = [
  { id: 'a1', nom: 'OTR-IMPOTS', type: 'SHID', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Impôts', serviceId: 's1', compte: 'TASC', nbTransactions: 5240, statut: 'Actif', creeLe: '01/08/2026' },
  { id: 'a2', nom: 'OTR-DOUANES', type: 'SHID', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Douanes', serviceId: 's2', compte: 'TASC', nbTransactions: 3850, statut: 'Actif', creeLe: '01/08/2026' },
  { id: 'a3', nom: 'OTR-TAXES', type: 'MCOD', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Taxes', serviceId: 's3', compte: 'TASC', nbTransactions: 2100, statut: 'Actif', creeLe: '02/08/2026' },
  { id: 'a4', nom: 'OTR-AMENDES', type: 'MCOD', institution: 'Office Togolais des Recettes', institutionId: 'otr', service: 'Amendes', serviceId: 's4', compte: 'TASC', nbTransactions: 1250, statut: 'Actif', creeLe: '02/08/2026' },
  { id: 'a5', nom: 'PAL-DROITS', type: 'SHID', institution: 'Port Autonome de Lomé', institutionId: 'pal', service: 'Droits portuaires', serviceId: 's6', compte: 'TASC', nbTransactions: 2850, statut: 'Actif', creeLe: '03/08/2026' },
  { id: 'a6', nom: 'CRT-RETRAITES', type: 'SHID', institution: 'Caisse de Retraites du Togo', institutionId: 'crt', service: 'Retraites', serviceId: 's8', compte: 'TASC', nbTransactions: 1840, statut: 'Actif', creeLe: '05/08/2026' },
  { id: 'a7', nom: 'DGT-SALAIRES', type: 'MCOD', institution: 'Direction Générale des Douanes', institutionId: 'dgt', service: 'Salaires', serviceId: 's9', compte: 'TASC', nbTransactions: 2100, statut: 'Actif', creeLe: '07/08/2026' },
]
