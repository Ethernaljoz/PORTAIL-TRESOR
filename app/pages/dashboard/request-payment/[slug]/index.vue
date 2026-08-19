<script setup lang="ts">
import { computed } from 'vue'
import type { DemandePaiement } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const route = useRoute()
const { demandesPaiement } = useMockData()

const reference = route.params.slug as string

const demande = computed(() => demandesPaiement.value.find(d => d.reference === reference))

const statutColor = (statut: string) => {
  const map: Record<string, string> = {
    'Réussi': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
    'Expiré': 'text-muted-foreground bg-muted ring-border',
    'Rejeté': 'text-destructive bg-destructive/10 ring-destructive/20',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function formatMontant(val: number): string {
  return val.toLocaleString('fr-FR') + ' XOF'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <button class="size-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition" @click="navigateTo('/dashboard/request-payment')">
        <Icon name="i-lucide-arrow-left" class="size-4" />
      </button>
      <div>
        <h1 class="text-xl font-semibold">Détail de la demande</h1>
        <p class="text-sm text-muted-foreground mt-1">{{ reference }}</p>
      </div>
    </div>

    <template v-if="demande">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-base">Informations générales</CardTitle>
            </div>
            <span :class="['inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset', statutColor(demande.statut)]">
              {{ demande.statut }}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <DetailRow label="Référence" :value="demande.reference" />
            <DetailRow label="Type" :value="demande.type" />
            <DetailRow label="Usager" :value="demande.usager" />
            <DetailRow label="Institution" :value="demande.institution" />
            <DetailRow label="Montant" :value="formatMontant(demande.montant)" />
            <DetailRow label="Échéance" :value="demande.echeance" />
            <DetailRow label="Date de demande" :value="demande.date" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex gap-3">
            <button v-if="demande.statut === 'En attente'" class="h-9 px-4 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all inline-flex items-center gap-2">
              <Icon name="i-lucide-check" class="size-4" />
              Valider
            </button>
            <button v-if="demande.statut === 'En attente'" class="h-9 px-4 rounded-lg border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/10 transition-all inline-flex items-center gap-2">
              <Icon name="i-lucide-x" class="size-4" />
              Rejeter
            </button>
            <button class="h-9 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-all inline-flex items-center gap-2">
              <Icon name="i-lucide-download" class="size-4" />
              Exporter PDF
            </button>
          </div>
        </CardContent>
      </Card>
    </template>

    <template v-else>
      <Card>
        <CardContent class="flex items-center justify-center h-40">
          <p class="text-muted-foreground text-sm">Demande introuvable pour la référence {{ reference }}</p>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
