<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Payment } from '~/types/payment'
import { Check, RotateCw, Search } from 'lucide-vue-next'
import { h, ref } from 'vue'
import ValidatePaymentForm from '@/components/form/ValidatePaymentForm.vue'
import { usePayments } from '~/composables/usePayments'
import { usePermissions } from '~/composables/usePermissions'
import { useServerDataTable } from '~/composables/useServerDataTable'

definePageMeta({
  requiresAuth: true,
})

const { can } = usePermissions()
const hasAccess = computed(() => can('validate'))

const { paymentsToValidateFetcher } = usePayments()

const validateTarget = ref<Payment | null>(null)
const showValidate = ref(false)

function formatAmount(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} Fcfa`
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
  return [p.last_name, p.first_name].filter(Boolean).join(' ') || '-'
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => h('span', { class: 'font-mono font-semibold text-sm' }, row.getValue('code')),
  },
  {
    accessorKey: 'paid_at',
    header: 'Date de paiement',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('paid_at'))),
  },
  {
    id: 'patient',
    header: 'Patient',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, getPatientName(row.original)),
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => h('span', { class: 'text-sm font-semibold text-right block' }, formatAmount(row.getValue('amount'))),
  },
  {
    accessorKey: 'phone',
    header: 'N° payeur',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
  },
  {
    accessorKey: 'speciality',
    header: 'Spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('speciality') || '-'),
  },
  {
    accessorKey: 'praticien',
    header: 'Praticien',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('praticien') || '-'),
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-center' }, 'Action'),
    cell: ({ row }) => {
      const p = row.original
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-success hover:text-success/80 hover:border-success/30 transition',
          title: 'Valider',
          onClick: () => { validateTarget.value = p; showValidate.value = true },
        }, h(Check, { class: 'size-[14px]' })),
      ])
    },
  },
]

const searchQuery = ref('')

const {
  table,
  isLoading,
  refetch,
  globalFilter,
  total,
} = useServerDataTable<Payment>({
  queryKey: ['payments-to-validate'],
  columns,
  fetcher: paymentsToValidateFetcher,
  staleTime: 30_000,
})
</script>

<template>
  <ClientOnly>
    <div v-if="hasAccess" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">
            Validation des consultations
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            Validez les nouvelles consultations payées
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            v-model="searchQuery" type="text" placeholder="Rechercher (code, patient, n° payeur)..."
            class="field-input pl-9" @input="globalFilter = ($event.target as HTMLInputElement).value"
          >
        </div>
        <!-- <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="h-10" @click="refetch()">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button>
        </div> -->
      </div>

      <AppDataTable :table="table" :is-loading="isLoading" empty-message="Aucune consultation en attente de validation." />

      <AppPagination :table="table" :total="total" />

      <ValidatePaymentForm v-model:open="showValidate" :consultation="validateTarget" />
    </div>
    <div v-else class="flex items-center justify-center h-64">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-muted-foreground">
          Accès refusé
        </h1>
        <p class="text-sm text-muted-foreground mt-2">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
      </div>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-muted-foreground">
            Accès refusé
          </h1>
          <p class="text-sm text-muted-foreground mt-2">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
