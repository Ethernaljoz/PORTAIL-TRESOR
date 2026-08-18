<script setup lang="ts">
const route = useRoute()

function getPageTitle(): string {
  if (route.path.match(/^\/users\/\d+\/grant$/)) {
    return 'Droits utilisateur'
  }
  const titles: Record<string, string> = {
    '/': 'Tableau de bord',
    '/payments': 'Paiements',
    '/payments/validate': 'Validés',
    '/specialities': 'Spécialités',
    '/praticiens': 'Praticiens',
    '/users': 'Utilisateurs',
    '/logs': 'Journal',
    '/payments/verify': 'Vérifier',
    '/stats/paiements': 'Stats paiements',
    '/stats/chiffre-affaires': 'Chiffre d\'affaires',
  }
  return titles[route.path] || 'CNHU-HKM'
}

function getPageSubtitle(): string {
  if (route.path === '/') {
    return 'Bienvenue, Admin CNHU. Voici un aperçu de l\'activité du jour.'
  }
  return ''
}
</script>

<template>
  <SidebarProvider>
    <LayoutAppSidebar />
    <SidebarInset>
      <LayoutHeader :title="getPageTitle()" :subtitle="getPageSubtitle()" />
      <div class="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <div class="px-6 lg:px-10 py-8 grow min-w-0">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
