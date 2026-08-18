import type { NavMenu, NavMenuItems } from '~/types/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'Administration',
    items: [
      {
        title: 'Tableau de bord',
        icon: 'i-lucide-layout-dashboard',
        link: '/',
        permission: 'dashboard',
      },
      {
        title: 'Paiements',
        icon: 'i-lucide-credit-card',
        link: '/payments',
        permission: 'payments',
      },
      {
        title: 'Validés',
        icon: 'i-lucide-circle-check',
        link: '/payments/validate',
        permission: 'validate',
      },
      {
        title: 'Spécialités',
        icon: 'i-lucide-folder-kanban',
        link: '/specialities',
        permission: [
          { module: 'specialities', permission: 'list' },
          { module: 'specialities', permission: 'create' },
          { module: 'specialities', permission: 'update' },
          { module: 'specialities', permission: 'delete' },
        ],
      },
      {
        title: 'Praticiens',
        icon: 'i-lucide-stethoscope',
        link: '/praticiens',
        permission: [
          { module: 'praticiens', permission: 'list' },
          { module: 'praticiens', permission: 'create' },
          { module: 'praticiens', permission: 'update' },
          { module: 'praticiens', permission: 'delete' },
        ],
      },
      {
        title: 'Utilisateurs',
        icon: 'i-lucide-users',
        link: '/users',
        permission: [
          { module: 'users', permission: 'list' },
          { module: 'users', permission: 'create' },
          { module: 'users', permission: 'update' },
          { module: 'users', permission: 'delete' },
          { module: 'users', permission: 'grant' },
        ],
      },
      // {
      //   title: 'Vérifier',
      //   icon: 'i-lucide-shield-alert',
      //   link: '/payments/verify',
      //   permission: [
      //     { module: 'verify', permission: 'list' },
      //     { module: 'verify', permission: 'check' },
      //     { module: 'verify', permission: 'create' },
      //   ],
      // },
      {
        title: 'Journal',
        icon: 'i-lucide-scroll-text',
        link: '/logs',
        permission: 'log',
      },
    ],
  },
  {
    heading: 'Statistiques',
    items: [
      {
        title: 'Stats paiements',
        icon: 'i-lucide-chart-column',
        link: '/stats/paiements',
        permission: 'statistics_payment',
      },
      {
        title: 'Chiffre d\'affaires',
        icon: 'i-lucide-trending-up',
        link: '/stats/chiffre-affaires',
        permission: 'chiffre',
      },
    ],
  },
]

export const navMenuBottom: NavMenuItems = []
