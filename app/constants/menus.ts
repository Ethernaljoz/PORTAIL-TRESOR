import type { DocSection } from '~/types/platform'
import { DOC_SECTIONS } from './mock-data'

export const backofficeMenu = [
  {
    items: [
      { title: 'Vue d\'ensemble', icon: 'i-lucide-layout-dashboard', link: '/dashboard' },
      { title: 'Transactions', icon: 'i-lucide-arrow-right-left', link: '/dashboard/transactions' },
      { title: 'Demande de paiement', icon: 'i-lucide-file-text', link: '/dashboard/request-payment' },
      { title: 'Paiement recus', icon: 'i-lucide-download', link: '/dashboard/payment-received' },
      { title: 'Paiement envoyes', icon: 'i-lucide-upload', link: '/dashboard/payment-sent' },
      { title: 'Services', icon: 'i-lucide-cpu', link: '/dashboard/services' },
      { title: 'Utilisateurs', icon: 'i-lucide-users', link: '/dashboard/users' },
      { title: 'Gestion des acces', icon: 'i-lucide-shield', link: '/dashboard/access-management' },
      { title: 'Alias', icon: 'i-lucide-tag', link: '/dashboard/aliases' },
      { title: 'Notification', icon: 'i-lucide-bell', link: '/dashboard/notification' },
      { title: 'Journal d\'activite', icon: 'i-lucide-scroll-text', link: '/dashboard/logs' },
      { title: 'Structure', icon: 'i-lucide-network', link: '/dashboard/structure' },
      {
        title: 'Parametres',
        icon: 'i-lucide-settings',
        link: '/dashboard/settings',
        children: [
          {
            title: 'Login',
            icon: 'i-lucide-circle',
            link: '/login',
          },
          {
            title: 'Login Basic',
            icon: 'i-lucide-circle',
            link: '/login-basic',
          },
          {
            title: 'Register',
            icon: 'i-lucide-circle',
            link: '/register',
          },
          {
            title: 'Forgot Password',
            icon: 'i-lucide-circle',
            link: '/forgot-password',
          },
        ],
      },
    ],
  },
]

export const portalNav = [
  { title: 'Accueil', link: '/portal' },
  { title: 'Documentation', link: '/docs' },
  { title: 'Tarifs', link: '/portal#pricing' },
]

export const docSections: DocSection[] = DOC_SECTIONS
