<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Payment, PaymentStatus } from '~/types/payment'
import { Download, RotateCw } from 'lucide-vue-next'
import { h, onMounted, ref } from 'vue'
import { useChiffre } from '~/composables/useChiffre'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { cn } from '~/lib/utils'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const chiffre = useChiffre()

const activeTab = ref('specialites')

const dateDebut = ref('')
const dateFin = ref('')

const selectedType = ref<number | string>('')
const selectedSpeciality = ref<number | string>('')
const selectedPraticien = ref<number | string>('')

const operatorAction = ref('1')

function formatAmount(amount: number): string {
  if (amount == null)
    return '0'
  return `${String(amount).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')} Fcfa`
}

function formatDate(dateStr: string): string {
  if (!dateStr)
    return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const statusLabel: Record<string, string> = {
  to_validate: 'Validé',
  to_canceled: 'Annulé',
  expired: 'Expiré',
  paid: 'Payé',
}

const statusColor: Record<string, string> = {
  to_validate: 'text-success bg-success/12 ring-success/20',
  to_canceled: 'text-destructive bg-destructive/10 ring-destructive/20',
  expired: 'text-warning bg-warning/10 ring-warning/20',
  paid: 'text-muted-foreground bg-muted ring-border',
}

const specColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'paid_at',
    header: 'Date de validation',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('paid_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('user') || '-'),
  },
  {
    accessorKey: 'amount',
    header: 'Montant payé',
    cell: ({ row }) => h('span', { class: 'text-sm font-semibold text-right block' }, formatAmount(row.getValue('amount'))),
  },
  {
    accessorKey: 'phone',
    header: 'Numéro payeur',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
  },
  {
    accessorKey: 'type',
    header: 'Type spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('type') || '-'),
  },
  {
    accessorKey: 'speciality',
    header: 'Spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('speciality') || '-'),
  },
  {
    id: 'status',
    header: 'Statut',
    cell: () => h('span', {
      class: 'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset text-success bg-success/12 ring-success/20',
    }, 'Validée'),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

function opStatusCell(status: PaymentStatus) {
  const label = statusLabel[status] || status
  const color = statusColor[status] || ''
  return h('span', {
    class: cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', color),
  }, label)
}

const opColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'paid_at',
    header: 'Date et heure paiement',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('paid_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('user') || '-'),
  },
  {
    accessorKey: 'amount',
    header: 'Montant payé',
    cell: ({ row }) => h('span', { class: 'text-sm font-semibold text-right block' }, formatAmount(row.getValue('amount'))),
  },
  {
    accessorKey: 'phone',
    header: 'Numéro payeur',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
  },
  {
    accessorKey: 'speciality',
    header: 'Spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('speciality') || '-'),
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => opStatusCell(row.getValue('status')),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

const {
  table: specTable,
  isLoading: specLoading,
  refetch: specRefetch,
  columnFilters: specColumnFilters,
} = useServerDataTable<Payment>({
  queryKey: 'chiffre-specialities',
  columns: specColumns,
  fetcher: chiffre.specialitiesFetcher,
  initialPageSize: 15,
  staleTime: 30_000,
})

const {
  table: opTable,
  isLoading: opLoading,
  refetch: opRefetch,
  columnFilters: opColumnFilters,
} = useServerDataTable<Payment>({
  queryKey: 'chiffre-operator',
  columns: opColumns,
  fetcher: chiffre.createOperatorFetcher(),
  initialPageSize: 15,
  staleTime: 30_000,
})

onMounted(() => {
  if (can('chiffre')) {
    const today = new Date().toISOString().split('T')[0]
    dateDebut.value = today
    dateFin.value = today
    chiffre.loadTypes()
    applyFilters()
  }
})

function applyFilters() {
  const filters: { id: string, value: any }[] = []
  if (dateDebut.value)
    filters.push({ id: 'date_debut', value: dateDebut.value })
  if (dateFin.value)
    filters.push({ id: 'date_fin', value: dateFin.value })

  if (activeTab.value === 'specialites') {
    if (selectedType.value)
      filters.push({ id: 'type', value: selectedType.value })
    if (selectedSpeciality.value && selectedSpeciality.value !== 'all')
      filters.push({ id: 'speciality', value: selectedSpeciality.value })
    if (selectedPraticien.value)
      filters.push({ id: 'praticien_id', value: selectedPraticien.value })
    specColumnFilters.value = filters
  }
  else {
    filters.push({ id: 'action', value: operatorAction.value })
    opColumnFilters.value = filters
  }
}

function resetFilters() {
  const today = new Date().toISOString().split('T')[0]
  dateDebut.value = today
  dateFin.value = today
  selectedType.value = ''
  selectedSpeciality.value = ''
  selectedPraticien.value = ''
  operatorAction.value = '1'
  specColumnFilters.value = []
  opColumnFilters.value = []
}

function onTypeChange() {
  selectedSpeciality.value = ''
  selectedPraticien.value = ''
  chiffre.onTypeChange(selectedType.value)
}

async function onSpecialityChange() {
  selectedPraticien.value = ''
  if (selectedSpeciality.value) {
    await chiffre.loadPraticiens(selectedSpeciality.value)
  }
  else {
    chiffre.praticiens.value = []
  }
}

function switchOperatorTab(index: number) {
  operatorAction.value = index === 0 ? '1' : '2'
}

watch([selectedType, selectedSpeciality, selectedPraticien, dateDebut, dateFin, operatorAction], () => {
  applyFilters()
})

async function handleExport() {
  const model: Record<string, any> = {
    date_debut: dateDebut.value,
    date_fin: dateFin.value,
  }
  if (activeTab.value === 'specialites') {
    if (selectedType.value)
      model.type = selectedType.value
    if (selectedSpeciality.value)
      model.speciality = selectedSpeciality.value
    if (selectedPraticien.value)
      model.praticien_id = selectedPraticien.value
    await chiffre.exportSpecialities(model)
  }
  else {
    model.action = operatorAction.value
    await chiffre.exportOperator(model)
  }
}

function getTotalLabel(): string {
  if (activeTab.value === 'specialites') {
    const amt = chiffre.summary.value?.amount
    return amt != null ? formatAmount(amt) : '0 Fcfa'
  }
  return formatAmount(chiffre.operatorTotal.value)
}
</script>

<template>
  <ClientOnly>
    <template v-if="isPermissionsReady">
      <div v-if="can('chiffre')" class="space-y-6">
        <!-- Tabs -->
        <Tabs v-model="activeTab" value="specialites" @update:model-value="applyFilters">
          <TabsList>
            <TabsTrigger value="specialites">
              Par spécialité
            </TabsTrigger>
            <TabsTrigger value="operateur">
              Par opérateur
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <!-- Filter Card -->
        <Card>
          <CardContent class="p-4">
            <p class="text-[13px] font-medium mb-4">
              <template v-if="activeTab === 'specialites'">
                Filtrer les statistiques des paiements validés par spécialité et par période
              </template>
              <template v-else>
                Filtrer les statistiques des paiements effectués par opérateur et par période
              </template>
            </p>

            <div class="flex flex-wrap items-end gap-4">
              <template v-if="activeTab === 'specialites'">
                <div class="space-y-1.5">
                  <label class="text-[12px] font-medium text-muted-foreground">Type consultation</label>
                  <Select v-model="selectedType" @update:model-value="onTypeChange">
                    <SelectTrigger class="min-w-[180px]">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="t in chiffre.types?._rawValue" :key="t.id" :value="t.id">
                        {{ t.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[12px] font-medium text-muted-foreground">Spécialité</label>
                  <!-- <pre>{{ chiffre.specialities }}</pre> -->
                  <Select v-model="selectedSpeciality" @update:model-value="onSpecialityChange">
                    <SelectTrigger class="min-w-[200px]">
                      <SelectValue placeholder="Sélectionnez une spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="s in chiffre.specialities.value" :key="s.id" :value="s.id">
                        {{ s.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-1.5">
                  <!-- <pre>{{ chiffre.praticiens }}</pre> -->
                  <label class="text-[12px] font-medium text-muted-foreground">Praticien</label>
                  <Select v-model="selectedPraticien">
                    <SelectTrigger class="min-w-[200px]">
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="p in chiffre.praticiens.value" :key="p.id" :value="p.id">
                        {{ p.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </template>

              <div class="space-y-1.5 flex flex-col">
                <label class="text-[12px] font-medium text-muted-foreground">Date début</label>
                <AppDatePicker v-model="dateDebut" placeholder="Date début" />
              </div>
              <div class="space-y-1.5 flex flex-col">
                <label class="text-[12px] font-medium text-muted-foreground">Date fin</label>
                <AppDatePicker v-model="dateFin" :min="dateDebut" placeholder="Date fin" />
              </div>

              <Button variant="default" size="sm" class="h-10" @click="applyFilters">
                Filtrer
              </Button>
              <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
                <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Onglets opérateur (MTN/MOOV) -->
        <div v-if="activeTab === 'operateur'" class="flex items-center gap-4 border-b border-border pb-3">
          <button
            v-for="(tab, idx) in ['MTN', 'MOOV']"
            :key="idx"
            class="text-[14px] font-medium pb-1 transition-colors"
            :class="operatorAction === (idx === 0 ? '1' : '2') ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'"
            @click="switchOperatorTab(idx)"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Total amount -->
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[13px] text-muted-foreground">Montant total collecté</span>
            <p class="text-[22px] font-semibold text-foreground mt-0.5">
              {{ getTotalLabel() }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" class="h-10" @click="activeTab === 'specialites' ? specRefetch() : opRefetch()">
              <RotateCw class="size-4 mr-1.5" />
              Actualiser
            </Button>
            <Button variant="default" size="sm" class="h-10" :disabled="chiffre.isExporting" @click="handleExport">
              <Download class="size-4 mr-1.5" />
              Exporter
            </Button>
          </div>
        </div>

        <!-- Specialities Table -->
        <div v-show="activeTab === 'specialites'">
          <AppDataTable :table="specTable" :is-loading="specLoading" />
          <div class="mt-4">
            <AppPagination :table="specTable" />
          </div>
        </div>

        <!-- Operator Table -->
        <div v-show="activeTab === 'operateur'">
          <AppDataTable :table="opTable" :is-loading="opLoading" />
          <div class="mt-4">
            <AppPagination :table="opTable" />
          </div>
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
