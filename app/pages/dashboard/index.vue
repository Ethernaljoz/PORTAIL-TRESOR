<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const { stats, activeApps, activeKeys, logs } = useMockData()

const statCards = computed(() => [
  { label: 'Requêtes aujourd\'hui', value: stats.value.requestsToday.toLocaleString(), icon: 'i-lucide-activity', color: 'text-primary bg-primary/10' },
  { label: 'Taux de succès', value: `${stats.value.successRate}%`, icon: 'i-lucide-check-circle', color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Latence moyenne', value: `${stats.value.avgLatency}ms`, icon: 'i-lucide-timer', color: 'text-amber-600 bg-amber-50' },
  { label: 'Erreurs aujourd\'hui', value: stats.value.errorsToday.toString(), icon: 'i-lucide-alert-triangle', color: 'text-destructive bg-destructive/10' },
])

const recentLogs = computed(() => logs.value.slice(0, 5))

function statusColor(code: number): string {
  if (code >= 200 && code < 300) return 'text-emerald-600 bg-emerald-50 ring-emerald-200'
  if (code >= 400 && code < 500) return 'text-amber-600 bg-amber-50 ring-amber-200'
  return 'text-destructive bg-destructive/10 ring-destructive/20'
}

function methodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: 'text-emerald-600 bg-emerald-50',
    POST: 'text-blue-600 bg-blue-50',
    PUT: 'text-amber-600 bg-amber-50',
    DELETE: 'text-destructive bg-destructive/10',
    PATCH: 'text-purple-600 bg-purple-50',
  }
  return colors[method] || 'text-muted-foreground bg-muted'
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold">Tableau de bord</h1>
      <p class="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre activité API</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="stat in statCards" :key="stat.label">
        <CardContent class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-[12px] text-muted-foreground font-medium">{{ stat.label }}</div>
              <div class="text-2xl font-bold mt-1">{{ stat.value }}</div>
            </div>
            <div :class="['size-10 rounded-lg flex items-center justify-center', stat.color]">
              <Icon :name="stat.icon" class="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Stats -->
      <Card class="lg:col-span-1">
        <CardHeader>
          <CardTitle class="text-base">Résumé</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Applications actives</span>
            <span class="text-sm font-semibold">{{ activeApps }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Clés API actives</span>
            <span class="text-sm font-semibold">{{ activeKeys }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Total requêtes (mois)</span>
            <span class="text-sm font-semibold">{{ stats.totalRequests.toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-muted-foreground">Environnement</span>
            <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset text-amber-600 bg-amber-50 ring-amber-200">
              Sandbox
            </span>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle class="text-base">Activité récente</CardTitle>
          <CardDescription>Dernières 5 requêtes API</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div v-for="log in recentLogs" :key="log.id" class="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold font-mono', methodColor(log.method)]">
                {{ log.method }}
              </span>
              <span class="text-sm font-mono text-foreground flex-1 truncate">{{ log.endpoint }}</span>
              <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statusColor(log.statusCode)]">
                {{ log.statusCode }}
              </span>
              <span class="text-xs text-muted-foreground">{{ formatTime(log.timestamp) }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
