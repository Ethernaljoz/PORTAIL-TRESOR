<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const { apps } = useMockData()

function statusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    inactive: 'text-muted-foreground bg-muted ring-border',
    pending: 'text-amber-600 bg-amber-50 ring-amber-200',
  }
  return colors[status] || 'text-muted-foreground bg-muted'
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = { active: 'Active', inactive: 'Inactive', pending: 'En attente' }
  return labels[status] || status
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Applications</h1>
        <p class="text-sm text-muted-foreground mt-1">Gérez vos applications enregistrées</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvelle application
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="app in apps" :key="app.id" class="hover:shadow-md transition-all">
        <CardContent class="p-5">
          <div class="flex items-start justify-between mb-3">
            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="i-lucide-box" class="size-5 text-primary" />
            </div>
            <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statusColor(app.status)]">
              {{ statusLabel(app.status) }}
            </span>
          </div>
          <h3 class="font-semibold text-foreground">{{ app.name }}</h3>
          <p class="text-sm text-muted-foreground mt-1 line-clamp-2">{{ app.description }}</p>
          <div class="mt-4 pt-3 border-t border-border space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Environnement</span>
              <span class="font-medium">{{ app.environment }}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Créée le</span>
              <span class="font-medium">{{ app.createdAt }}</span>
            </div>
          </div>
          <div class="mt-3">
            <code class="text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded block truncate">{{ app.baseUrl }}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
