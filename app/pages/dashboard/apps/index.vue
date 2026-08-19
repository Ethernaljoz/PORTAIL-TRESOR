<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { enrolements } = useMockData()

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Approuvé': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
    'Rejeté': 'text-destructive bg-destructive/10 ring-destructive/20',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

const approved = computed(() => enrolements.value.filter(e => e.statut === 'Approuvé').length)
const pending = computed(() => enrolements.value.filter(e => e.statut === 'En attente').length)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Institutions</h1>
        <p class="text-sm text-muted-foreground mt-1">Institutions enrôlées sur la plateforme</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Total</div>
          <div class="text-2xl font-bold mt-1">{{ enrolements.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Approuvées</div>
          <div class="text-2xl font-bold mt-1 text-emerald-600">{{ approved }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">En attente</div>
          <div class="text-2xl font-bold mt-1 text-amber-600">{{ pending }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Liste -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="inst in enrolements" :key="inst.id" class="hover:shadow-md transition-all">
        <CardContent class="p-5">
          <div class="flex items-start justify-between mb-3">
            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="i-lucide-building-2" class="size-5 text-primary" />
            </div>
            <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statutColor(inst.statut)]">
              {{ inst.statut }}
            </span>
          </div>
          <h3 class="font-semibold text-foreground">{{ inst.institution }}</h3>
          <p class="text-xs text-muted-foreground mt-1">{{ inst.typeInstitution }}</p>
          <p class="text-sm text-muted-foreground mt-2 line-clamp-2">{{ inst.motif }}</p>
          <div class="mt-4 pt-3 border-t border-border space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Demandeur</span>
              <span class="font-medium">{{ inst.demandeur }}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Services demandés</span>
              <span class="font-medium">{{ inst.servicesDemandes }}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Date demande</span>
              <span class="font-medium">{{ inst.dateDemande }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
