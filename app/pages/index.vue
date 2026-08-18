<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()

const {
  stats,
  donut,
  monthly,
  loadingStats,
  loadingDonut,
  loadingMonthly,
  refresh,
} = useDashboard()

onMounted(() => {
  if (can('dashboard')) {
    refresh()
  }
})
</script>

<template>
  <ClientOnly>
    <template v-if="isPermissionsReady">
      <div v-if="can('dashboard')" class="space-y-6">
        <DashboardStatsCards :stats="stats as any" :loading="loadingStats" />

        <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <Card class="xl:col-span-3">
            <CardHeader>
              <CardTitle>Chiffre d'affaires par mois</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardBarChart :series="monthly as any ?? []" :loading="loadingMonthly" />
            </CardContent>
          </Card>

          <Card class="xl:col-span-2">
            <CardHeader>
              <CardTitle>Top 10 des spécialités</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardDonutChart :series="donut?.series ?? []" :labels="donut?.labels ?? []" :loading="loadingDonut" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 class="text-3xl font-bold text-muted-foreground">
          404 - Page introuvable!
        </h1>
        <p class="text-muted-foreground mt-2">
          Vous n'avez pas accès à cette page
        </p>
      </div>
    </template>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
