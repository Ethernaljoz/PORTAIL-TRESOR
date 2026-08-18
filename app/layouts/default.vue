<script setup lang="ts">
const route = useRoute()

function getPageTitle(): string {
  const titles: Record<string, string> = {
    '/dashboard': 'Tableau de bord',
    '/dashboard/apps': 'Applications',
    '/dashboard/keys': 'Clés API',
    '/dashboard/logs': 'Journal d\'activité',
    '/dashboard/settings': 'Paramètres',
  }
  return titles[route.path] || 'TRésor API'
}
</script>

<template>
  <SidebarProvider>
    <LayoutAppSidebar />
    <SidebarInset>
      <LayoutHeader :title="getPageTitle()" />
      <div class="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <div class="px-6 lg:px-10 py-8 grow min-w-0">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
