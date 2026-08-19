import type { DocSection } from '~/types/platform'
import { DOC_SECTIONS } from './mock-data'

export const backofficeMenu = [
  {
    // heading: '',
    items: [
      { title: 'Vue d\'ensemble', icon: 'i-lucide-layout-dashboard', link: '/dashboard' },
      { title: 'Transactions', icon: 'i-lucide-box', link: '/dashboard/transactions' },
      { title: 'Demande de paiement', icon: 'i-lucide-key', link: '/dashboard/request-payment' },
      { title: 'Paiement reçus', icon: 'i-lucide-key', link: '/dashboard/payment-received' },
      { title: 'Paiement envoyés', icon: 'i-lucide-key', link: '/dashboard/payment-sent' },
      { title: 'Services', icon: 'i-lucide-key', link: '/dashboard/services' },
      { title: 'Utilisateurs', icon: 'i-lucide-key', link: '/dashboard/users' },
      { title: 'Gestion des accès', icon: 'i-lucide-key', link: '/dashboard/access-management' },
      { title: 'Alias', icon: 'i-lucide-key', link: '/dashboard/aliases' },
      { title: 'Notification', icon: 'i-lucide-key', link: '/dashboard/notification' },
      { title: 'Journal d\'activité', icon: 'i-lucide-scroll-text', link: '/dashboard/logs' },
      { title: 'Structure', icon: 'i-lucide-key', link: '/dashboard/structure' },
      {
        title: 'Paramètres',
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
