<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { paiementsRecus } = useMockData()

const statutFilter = ref('')
const institutionFilter = ref('')

const filteredPaiements = computed(() => {
  return paiementsRecus.value.filter(p => {
    if (statutFilter.value && p.statut !== statutFilter.value) return false
    if (institutionFilter.value && p.institution !== institutionFilter.value) return false
    return true
  })
})

const uniqueInstitutions = computed(() => [...new Set(paiementsRecus.value.map(p => p.institution))])

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Réussi': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
    'Échoué': 'text-destructive bg-destructive/10 ring-destructive/20',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function formatMontant(val: number): string {
  return val.toLocaleString('fr-FR') + ' XOF'
}

const totalRecus = computed(() => filteredPaiements.value.reduce((sum, p) => sum + p.montant, 0))
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Paiements reçus</h1>
        <p class="text-sm text-muted-foreground mt-1">Historique des paiements reçus par la plateforme</p>
      </div>
    </div>

    <!-- Stats rapides -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Total paiements</div>
          <div class="text-2xl font-bold mt-1">{{ filteredPaiements.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Montant total</div>
          <div class="text-2xl font-bold mt-1">{{ (totalRecus / 1000000).toFixed(1) }}M XOF</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">En attente</div>
          <div class="text-2xl font-bold mt-1 text-amber-600">{{ filteredPaiements.filter(p => p.statut === 'En attente').length }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Institution</label>
            <select v-model="institutionFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[200px]">
              <option value="">Toutes</option>
              <option v-for="inst in uniqueInstitutions" :key="inst" :value="inst">{{ inst }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Statut</label>
            <select v-model="statutFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">Tous</option>
              <option value="Réussi">Réussi</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredPaiements.length }} résultat(s)
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
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Payeur</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">PSP</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Institution</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Montant</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Référence</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="p in filteredPaiements" :key="p.id" class="hover:bg-muted/50">
                <td class="py-3 px-4 text-xs font-mono text-muted-foreground">{{ p.id }}</td>
                <td class="py-3 px-4 text-xs font-medium">{{ p.payeur }}</td>
                <td class="py-3 px-4 text-xs text-muted-foreground">{{ p.pspPayeur }}</td>
                <td class="py-3 px-4 text-xs text-muted-foreground max-w-[150px] truncate">{{ p.institution }}</td>
                <td class="py-3 px-4 text-xs">{{ p.service }}</td>
                <td class="py-3 px-4 text-xs font-semibold font-mono">{{ formatMontant(p.montant) }}</td>
                <td class="py-3 px-4 text-xs font-mono text-muted-foreground">{{ p.reference }}</td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(p.statut)]">
                    {{ p.statut }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">{{ p.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
