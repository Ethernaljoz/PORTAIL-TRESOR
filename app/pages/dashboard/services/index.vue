<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { services } = useMockData()

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'Inactif': 'text-muted-foreground bg-muted ring-border',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function typeColor(type: string): string {
  const map: Record<string, string> = {
    'Recette': 'text-emerald-600 bg-emerald-50',
    'Dépense': 'text-amber-600 bg-amber-50',
    'Prestation': 'text-blue-600 bg-blue-50',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}

const uniqueInstitutions = computed(() => [...new Set(services.value.map(s => s.institution))])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Services</h1>
        <p class="text-sm text-muted-foreground mt-1">Services proposes par les institutions</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouveau service
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Total services</div>
          <div class="text-2xl font-bold mt-1">{{ services.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Services actifs</div>
          <div class="text-2xl font-bold mt-1 text-emerald-600">{{ services.filter(s => s.statut === 'Actif').length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Institutions</div>
          <div class="text-2xl font-bold mt-1">{{ uniqueInstitutions.length }}</div>
        </CardContent>
      </Card>
    </div>

    <div v-for="inst in uniqueInstitutions" :key="inst" class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{{ inst }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="service in services.filter(s => s.institution === inst)" :key="service.id" class="hover:shadow-md transition-all">
          <CardContent class="p-5">
            <div class="flex items-start justify-between mb-2">
              <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', typeColor(service.type)]">
                {{ service.type }}
              </span>
              <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statutColor(service.statut)]">
                {{ service.statut }}
              </span>
            </div>
            <h3 class="font-semibold text-foreground">{{ service.nom }}</h3>
            <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ service.description }}</p>
            <div class="mt-3 pt-3 border-t border-border space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="text-muted-foreground">Alias</span>
                <code class="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">{{ service.alias }}</code>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-muted-foreground">Transactions</span>
                <span class="font-medium">{{ service.nbTransactions.toLocaleString('fr-FR') }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
