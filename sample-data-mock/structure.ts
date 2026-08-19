import type { Structure } from '~/types/tresor'

export const mockStructure: Structure[] = [
  { id: 'st-01', nom: 'Portail Trésor', type: 'Plateforme centrale', parent: null, responsable: 'Koffi Mensah', nbUtilisateurs: 3, nbServices: 0, statut: 'Actif' },
  { id: 'st-02', nom: 'Office Togolais des Recettes', type: 'Régie financière', parent: 'st-01', responsable: 'Yawa Kossi', nbUtilisateurs: 1, nbServices: 4, statut: 'Actif' },
  { id: 'st-03', nom: 'Port Autonome de Lomé', type: 'Établissement public', parent: 'st-01', responsable: 'Komlan Agbo', nbUtilisateurs: 1, nbServices: 3, statut: 'Actif' },
  { id: 'st-04', nom: 'Caisse de Retraites du Togo', type: 'Institution publique', parent: 'st-01', responsable: 'Dodji Folly', nbUtilisateurs: 1, nbServices: 2, statut: 'Actif' },
  { id: 'st-05', nom: 'Direction Générale des Douanes', type: 'Administration', parent: 'st-01', responsable: 'Abra Sitsofi', nbUtilisateurs: 1, nbServices: 2, statut: 'Actif' },
  { id: 'st-06', nom: 'Ministère de la Fonction Publique', type: 'Administration', parent: 'st-01', responsable: 'Suru Kpatar', nbUtilisateurs: 1, nbServices: 2, statut: 'En attente' },
  { id: 'st-07', nom: 'Direction des Transports', type: 'Administration', parent: 'st-01', responsable: '-', nbUtilisateurs: 0, nbServices: 2, statut: 'En attente' },
]
