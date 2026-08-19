<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { alias, institutions } = useMockData()

const institutionFilter = ref('')
const searchRef = ref('')

const filteredAlias = computed(() => {
  return alias.value.filter(a => {
    if (institutionFilter.value && a.institution !== institutionFilter.value) return false
    if (searchRef.value) {
      const q = searchRef.value.toLowerCase()
      return a.nom.toLowerCase().includes(q) || a.service.toLowerCase().includes(q)
    }
    return true
  })
})

const uniqueInstitutions = computed(() => [...new Set(alias.value.map(a => a.institution))])

function typeColor(type: string): string {
  const map: Record<string, string> = {
    'SHID': 'text-blue-600 bg-blue-50',
    'MCOD': 'text-purple-600 bg-purple-50',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'Inactif': 'text-muted-foreground bg-muted ring-border',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Alias</h1>
        <p class="text-sm text-muted-foreground mt-1">Identifiants de routage des paiements</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvel alias
      </button>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Recherche</label>
            <input v-model="searchRef" type="text" placeholder="Nom ou service..." class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[200px]">
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Institution</label>
            <select v-model="institutionFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[200px]">
              <option value="">Toutes</option>
              <option v-for="inst in uniqueInstitutions" :key="inst" :value="inst">{{ inst }}</option>
            </select>
          </div>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredAlias.length }} alias
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Table -->
    <Card>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Nom</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Institution</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Compte</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Transactions</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Cree le</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="a in filteredAlias" :key="a.id" class="hover:bg-muted/50">
                <td class="py-3 px-4">
                  <code class="text-xs font-mono font-medium bg-muted px-2 py-0.5 rounded">{{ a.nom }}</code>
                </td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', typeColor(a.type)]">
                    {{ a.type }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground max-w-[180px] truncate">{{ a.institution }}</td>
                <td class="py-3 px-4 text-xs">{{ a.service }}</td>
                <td class="py-3 px-4 text-xs font-mono text-muted-foreground">{{ a.compte }}</td>
                <td class="py-3 px-4 text-xs font-semibold">{{ a.nbTransactions.toLocaleString('fr-FR') }}</td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(a.statut)]">
                    {{ a.statut }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">{{ a.creeLe }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
