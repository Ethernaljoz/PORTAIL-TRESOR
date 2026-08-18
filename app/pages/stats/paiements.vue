<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { FetchParams } from '~/composables/useServerDataTable'
import type { Payment } from '~/types/payment'
import { Download, RotateCw } from 'lucide-vue-next'
import { computed, h, onMounted, ref } from 'vue'
import { usePermissions } from '~/composables/usePermissions'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { useStatistics } from '~/composables/useStatistics'
import { cn } from '~/lib/utils'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const stats = useStatistics()

const activeTab = ref('validate')
const expiredAction = ref<'before' | 'after'>('before')
const dateDebut = ref('')
const dateFin = ref('')

function formatAmount(amount: number): string {
  if (amount == null)
    return '0 Fcfa'
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

function getPatientName(p: Payment): string {
  return [p.last_name, p.first_name].filter(Boolean).join(' ') || p.user || '-'
}

const statusColor: Record<string, string> = {
  to_validate: 'text-success bg-success/12 ring-success/20',
  to_canceled: 'text-destructive bg-destructive/10 ring-destructive/20',
  expired: 'text-destructive bg-destructive/10 ring-destructive/20',
  paid: 'text-muted-foreground bg-muted ring-border',
}

function statusCell(status: string, label: string): ReturnType<typeof h> {
  const color = statusColor[status] || ''
  return h('span', {
    class: cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', color),
  }, label)
}

// --- Validate columns ---
const validateColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'validated_at',
    header: 'Date et heure de validation',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('validated_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, getPatientName(row.original)),
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
    id: 'status',
    header: 'Statut',
    cell: () => statusCell('to_validate', 'Validé'),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

// --- To-validate columns ---
const toValidateColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'paid_at',
    header: 'Date et heure paiement',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('paid_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, getPatientName(row.original)),
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
    id: 'status',
    header: 'Statut',
    cell: () => statusCell('paid', 'Nouveau'),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

// --- Canceled columns ---
const canceledColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'canceled_at',
    header: 'Date et heure d\'annulation',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('canceled_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, getPatientName(row.original)),
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
    id: 'status',
    header: 'Statut',
    cell: () => statusCell('to_canceled', 'Annulé'),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

// --- Expired columns ---
const expiredColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'expiry_at',
    header: 'Date d\'expiration',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('expiry_at'))),
  },
  {
    accessorKey: 'user',
    header: 'Nom & prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm' }, getPatientName(row.original)),
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
    id: 'status',
    header: 'Statut',
    cell: () => statusCell('expired', 'Expiré'),
  },
  {
    accessorKey: 'code',
    header: 'Code consultation',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
]

// --- Table instances ---
const { table: validateTable, isLoading: validateLoading, refetch: validateRefetch, columnFilters: validateColumnFilters, amount: validateAmount }
  = useServerDataTable<Payment>({ queryKey: 'stats-validate', columns: validateColumns, fetcher: stats.isValidateFetcher, initialPageSize: 15 })

const { table: toValidateTable, isLoading: toValidateLoading, refetch: toValidateRefetch, columnFilters: toValidateColumnFilters, amount: toValidateAmount }
  = useServerDataTable<Payment>({ queryKey: 'stats-to-validate', columns: toValidateColumns, fetcher: stats.toValidateFetcher, initialPageSize: 15 })

const { table: canceledTable, isLoading: canceledLoading, refetch: canceledRefetch, columnFilters: canceledColumnFilters, amount: canceledAmount }
  = useServerDataTable<Payment>({ queryKey: 'stats-to-canceled', columns: canceledColumns, fetcher: stats.toCanceledFetcher, initialPageSize: 15 })

async function expiredFetcher(params: FetchParams) {
  const fetcher = stats.createExpiredFetcher(expiredAction.value)
  return fetcher(params)
}

const { table: expiredTable, isLoading: expiredLoading, refetch: expiredRefetch, columnFilters: expiredColumnFilters, amount: expiredAmount }
  = useServerDataTable<Payment>({ queryKey: 'stats-is-expired', columns: expiredColumns, fetcher: expiredFetcher, initialPageSize: 15 })



// --- Filter logic ---
function getActiveColumnFilters() {
  const filters: { id: string, value: any }[] = []
  if (dateDebut.value)
    filters.push({ id: 'date_debut', value: dateDebut.value })
  if (dateFin.value)
    filters.push({ id: 'date_fin', value: dateFin.value })
  return filters
}

function setAllColumnFilters(filters: { id: string, value: any }[]) {
  validateColumnFilters.value = filters
  toValidateColumnFilters.value = filters
  canceledColumnFilters.value = filters
  expiredColumnFilters.value = filters
}

function applyFilters() {
  const filters = getActiveColumnFilters()
  setAllColumnFilters(filters)
}

function resetFilters() {
  const today = new Date().toISOString().split('T')[0]
  dateDebut.value = today
  dateFin.value = today
  setAllColumnFilters([])
}

onMounted(() => {
  if (can('statistics_payment')) {
    const today = new Date().toISOString().split('T')[0]
    dateDebut.value = today
    dateFin.value = today
    // Ne pas appliquer les filtres au montage — laisser les tableaux charger sans filtre
  }
})

function switchExpiredTab(action: 'before' | 'after') {
  expiredAction.value = action
  expiredColumnFilters.value = getActiveColumnFilters() // triggers refetch only for expired tab
}

function refetchActive() {
  switch (activeTab.value) {
    case 'validate': validateRefetch(); break
    case 'to-validate': toValidateRefetch(); break
    case 'to-canceled': canceledRefetch(); break
    case 'expired': expiredRefetch(); break
  }
}

async function handleExport() {
  const model: Record<string, any> = {
    date_debut: dateDebut.value,
    date_fin: dateFin.value,
  }
  switch (activeTab.value) {
    case 'validate': await stats.exportIsValidate(model); break
    case 'to-validate': await stats.exportToValidate(model); break
    case 'to-canceled': await stats.exportToCanceled(model); break
    case 'expired': {
      const exportFn = stats.createExportExpired(expiredAction.value)
      model.action = expiredAction.value
      await exportFn(model)
      break
    }
  }
}

const activeAmount = computed(() => {
  switch (activeTab.value) {
    case 'validate': return validateAmount.value
    case 'to-validate': return toValidateAmount.value
    case 'to-canceled': return canceledAmount.value
    case 'expired': return expiredAmount.value
    default: return null
  }
})

function getTotalLabel(): string {
  return formatAmount(activeAmount.value ?? 0)
}

const filterDescriptions: Record<string, string> = {
  'validate': 'Filtrer les statistiques des paiements validés par période',
  'to-validate': 'Filtrer les statistiques des paiements à valider par période',
  'to-canceled': 'Filtrer les statistiques des paiements annulés par période',
  'expired': expiredAction.value === 'before'
    ? 'Filtrer les statistiques des paiements expirés par période avant validation'
    : 'Filtrer les statistiques des paiements expirés par période après validation',
}
</script>

<template>
  <ClientOnly>
    <div v-if="can('statistics_payment')" class="space-y-6">
      <!-- Tabs -->
      <Tabs v-model="activeTab" value="validate">
        <TabsList>
          <TabsTrigger value="validate">
            Validées
          </TabsTrigger>
          <TabsTrigger value="to-validate">
            À valider
          </TabsTrigger>
          <TabsTrigger value="to-canceled">
            Annulées
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expirées
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <!-- Filter Card -->
      <Card>
        <CardContent class="p-4">
          <p class="text-[13px] font-medium mb-4">
            {{ filterDescriptions[activeTab] }}
          </p>

          <div class="flex flex-wrap items-end gap-4">
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

      <!-- Expired sub-tabs -->
      <div v-if="activeTab === 'expired'" class="flex items-center gap-4 border-b border-border pb-3">
        <button v-for="(tab, idx) in ['Avant validation', 'Après validation']" :key="idx"
          class="text-[14px] font-medium pb-1 transition-colors"
          :class="expiredAction === (idx === 0 ? 'before' : 'after') ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'"
          @click="switchExpiredTab(idx === 0 ? 'before' : 'after')">
          {{ tab }}
        </button>
      </div>

      <!-- Total amount + actions -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-[13px] text-muted-foreground">Montant total</span>
          <p class="text-[22px] font-semibold text-foreground mt-0.5">
            {{ getTotalLabel() }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="h-10" @click="refetchActive">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button>
          <Button variant="default" size="sm" class="h-10" :disabled="stats.isExporting" @click="handleExport">
            <Download class="size-4 mr-1.5" />
            Exporter
          </Button>
        </div>
      </div>

      <!-- Validate Table -->
      <div v-show="activeTab === 'validate'">
        <AppDataTable :table="validateTable" :is-loading="validateLoading" />
        <div class="mt-4">
          <AppPagination :table="validateTable" />
        </div>
      </div>

      <!-- To-validate Table -->
      <div v-show="activeTab === 'to-validate'">
        <AppDataTable :table="toValidateTable" :is-loading="toValidateLoading" />
        <div class="mt-4">
          <AppPagination :table="toValidateTable" />
        </div>
      </div>

      <!-- Canceled Table -->
      <div v-show="activeTab === 'to-canceled'">
        <AppDataTable :table="canceledTable" :is-loading="canceledLoading" />
        <div class="mt-4">
          <AppPagination :table="canceledTable" />
        </div>
      </div>

      <!-- Expired Table -->
      <div v-show="activeTab === 'expired'">
        <AppDataTable :table="expiredTable" :is-loading="expiredLoading" />
        <div class="mt-4">
          <AppPagination :table="expiredTable" />
        </div>
      </div>
    </div>

    <div v-else-if="isPermissionsReady" class="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 class="text-3xl font-bold text-muted-foreground">
        404 - Page introuvable!
      </h1>
      <p class="text-muted-foreground mt-2">
        Vous n'avez pas accès à cette page
      </p>
    </div>
    <div v-else class="flex items-center justify-center h-[60vh]">
      <div class="flex items-center gap-2 text-muted-foreground">
        <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Chargement...</span>
      </div>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
