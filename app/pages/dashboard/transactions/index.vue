<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { transactions } = useMockData()

const typeFilter = ref('')
const statutFilter = ref('')

const filteredTransactions = computed(() => {
  return transactions.value.filter(tx => {
    if (typeFilter.value && tx.type !== typeFilter.value) return false
    if (statutFilter.value && tx.statut !== statutFilter.value) return false
    return true
  })
})

function typeColor(type: string): string {
  const map: Record<string, string> = {
    'Recette': 'text-emerald-600 bg-emerald-50',
    'Dépense': 'text-amber-600 bg-amber-50',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Réussi': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
    'Échoué': 'text-destructive bg-destructive/10 ring-destructive/20',
    'Annulé': 'text-muted-foreground bg-muted ring-border',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function formatMontant(val: number): string {
  return val.toLocaleString('fr-FR') + ' XOF'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Transactions</h1>
        <p class="text-sm text-muted-foreground mt-1">Historique des transactions financières</p>
      </div>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Type</label>
            <select v-model="typeFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">Tous</option>
              <option value="Recette">Recette</option>
              <option value="Dépense">Dépense</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Statut</label>
            <select v-model="statutFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">Tous</option>
              <option value="Réussi">Réussi</option>
              <option value="En attente">En attente</option>
              <option value="Échoué">Échoué</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredTransactions.length }} résultat(s)
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
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Montant</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Référence</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-muted/50">
                <td class="py-3 px-4 text-xs font-mono text-muted-foreground whitespace-nowrap">{{ tx.id }}</td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', typeColor(tx.type)]">
                    {{ tx.type }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs max-w-[200px] truncate">{{ tx.description }}</td>
                <td class="py-3 px-4 text-xs font-semibold font-mono">{{ formatMontant(tx.montant) }}</td>
                <td class="py-3 px-4 text-xs font-mono text-muted-foreground">{{ tx.reference }}</td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(tx.statut)]">
                    {{ tx.statut }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">{{ tx.dateInitiation }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
