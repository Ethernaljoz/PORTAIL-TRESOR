<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const {
  institutions,
  transactions,
  paiementsRecus,
  paiementsEnvoyes,
  demandesPaiement,
  reconciliation,
  notifications,
} = useMockData()

const statCards = computed(() => {
  const todayTransactions = transactions.value.length
  const succeeded = transactions.value.filter(t => t.statut === 'Réussi').length
  const successRate = todayTransactions > 0 ? ((succeeded / todayTransactions) * 100).toFixed(1) : '0'
  const totalAmount = transactions.value.reduce((sum, t) => sum + t.montant, 0)
  const pendingPayments = demandesPaiement.value.filter(d => d.statut === 'En attente').length

  return [
    { label: 'Institutions actives', value: institutions.value.filter(i => i.statut === 'Active').length.toString(), icon: 'i-lucide-building-2', color: 'text-primary bg-primary/10' },
    { label: 'Transactions du jour', value: todayTransactions.toString(), icon: 'i-lucide-arrow-right-left', color: 'text-blue-600 bg-blue-50' },
    { label: 'Taux de succès', value: `${successRate}%`, icon: 'i-lucide-check-circle', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Volume total', value: `${(totalAmount / 1000000).toFixed(1)}M XOF`, icon: 'i-lucide-wallet', color: 'text-amber-600 bg-amber-50' },
  ]
})

const recentTransactions = computed(() => transactions.value.slice(0, 5))
const pendingDemandes = computed(() => demandesPaiement.value.filter(d => d.statut === 'En attente'))
const unreadNotifs = computed(() => notifications.value.filter(n => !n.lue).length)

function montantLabel(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K`
  return val.toString()
}

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

function notifIcon(type: string): string {
  const map: Record<string, string> = {
    info: 'i-lucide-info',
    success: 'i-lucide-check-circle',
    warning: 'i-lucide-alert-triangle',
    error: 'i-lucide-x-circle',
  }
  return map[type] || 'i-lucide-bell'
}

function notifColor(type: string): string {
  const map: Record<string, string> = {
    info: 'text-blue-600 bg-blue-50',
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    error: 'text-destructive bg-destructive/10',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold">Tableau de bord</h1>
      <p class="text-sm text-muted-foreground mt-1">Vue d'ensemble de la plateforme Trésor</p>
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
      <!-- Résumé rapide -->
      <Card class="lg:col-span-1">
        <CardHeader>
          <CardTitle class="text-base">Résumé</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Paiements reçus</span>
            <span class="text-sm font-semibold">{{ paiementsRecus.length }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Paiements envoyés</span>
            <span class="text-sm font-semibold">{{ paiementsEnvoyes.length }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Demandes en attente</span>
            <span class="text-sm font-semibold text-amber-600">{{ pendingDemandes.length }}</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-border">
            <span class="text-sm text-muted-foreground">Réconciliations</span>
            <span class="text-sm font-semibold">{{ reconciliation.length }}</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-muted-foreground">Notifications non lues</span>
            <span v-if="unreadNotifs > 0" class="text-sm font-semibold text-destructive">{{ unreadNotifs }}</span>
            <span v-else class="text-sm font-semibold text-muted-foreground">0</span>
          </div>
        </CardContent>
      </Card>

      <!-- Transactions récentes -->
      <Card class="lg:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base">Transactions récentes</CardTitle>
            <CardDescription>Dernières {{ recentTransactions.length }} transactions</CardDescription>
          </div>
          <NuxtLink to="/dashboard/transactions" class="text-xs text-primary hover:underline">
            Voir tout
          </NuxtLink>
        </CardHeader>
        <CardContent>
          <div class="space-y-3">
            <div v-for="tx in recentTransactions" :key="tx.id" class="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', typeColor(tx.type)]">
                {{ tx.type }}
              </span>
              <span class="text-sm text-foreground flex-1 truncate">{{ tx.description }}</span>
              <span class="text-sm font-semibold font-mono">{{ montantLabel(tx.montant) }} XOF</span>
              <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(tx.statut)]">
                {{ tx.statut }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Notifications récentes -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between">
        <div>
          <CardTitle class="text-base">Notifications récentes</CardTitle>
          <CardDescription>{{ unreadNotifs }} non lue(s)</CardDescription>
        </div>
        <NuxtLink to="/dashboard/notification" class="text-xs text-primary hover:underline">
          Tout voir
        </NuxtLink>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-for="notif in notifications.slice(0, 4)" :key="notif.id" class="flex items-start gap-3 py-2 border-b border-border last:border-0" :class="{ 'opacity-60': notif.lue }">
            <div :class="['size-8 rounded-lg flex items-center justify-center shrink-0', notifColor(notif.type)]">
              <Icon :name="notifIcon(notif.type)" class="size-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium">{{ notif.titre }}</span>
                <span v-if="!notif.lue" class="size-2 rounded-full bg-primary shrink-0" />
              </div>
              <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">{{ notif.message }}</p>
            </div>
            <span class="text-[11px] text-muted-foreground whitespace-nowrap">{{ notif.date }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
