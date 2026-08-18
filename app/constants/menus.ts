import type { DocSection } from '~/types/platform'
import { DOC_SECTIONS } from './mock-data'

export const backofficeMenu = [
  {
    heading: 'Développeur',
    items: [
      { title: 'Dashboard', icon: 'i-lucide-layout-dashboard', link: '/dashboard' },
      { title: 'Applications', icon: 'i-lucide-box', link: '/dashboard/apps' },
      { title: 'Clés API', icon: 'i-lucide-key', link: '/dashboard/keys' },
      { title: 'Journal d\'activité', icon: 'i-lucide-scroll-text', link: '/dashboard/logs' },
      { title: 'Paramètres', icon: 'i-lucide-settings', link: '/dashboard/settings' },
    ],
  },
]

export const portalNav = [
  { title: 'Accueil', link: '/portal' },
  { title: 'Documentation', link: '/docs' },
  { title: 'Tarifs', link: '/portal#pricing' },
]

export const docSections: DocSection[] = DOC_SECTIONS
