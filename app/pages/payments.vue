<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Payment, PaymentStatus } from '~/types/payment'
import { Eye, Pencil, Plus, Printer, RotateCw, Search, Send, XCircle } from 'lucide-vue-next'
import { h, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import EditPaymentForm from '@/components/form/EditPaymentForm.vue'
import { usePayments } from '~/composables/usePayments'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { useAuth } from '~/composables/useAuth'
import { cn } from '~/lib/utils'

definePageMeta({
  requiresAuth: true,
})

const statusOptions = [
  { label: 'Tous', value: '' },
  { label: 'Nouveau', value: 'paid' },
  { label: 'Validé', value: 'to_validate' },
  { label: 'Annulé', value: 'to_canceled' },
  { label: 'Expiré', value: 'expired' },
]

const statusLabel: Record<PaymentStatus, string> = {
  paid: 'Nouveau',
  to_validate: 'Validé',
  to_canceled: 'Annulé',
  expired: 'Expiré',
}

const statusColor: Record<PaymentStatus, string> = {
  paid: 'text-primary bg-primary/10 ring-primary/20',
  to_validate: 'text-success bg-success/12 ring-success/20',
  to_canceled: 'text-destructive bg-destructive/10 ring-destructive/20',
  expired: 'text-warning bg-warning/10 ring-warning/20',
}

const { user } = useAuth()
const isAdmin = computed(() => user.value?.profile === '2')
const { specialities, loadSpecialities, agents, loadAgents, fetcher, printPayment, resendCode, cancelPayment } = usePayments()

const detailPayment = ref<Payment | null>(null)
const cancelTarget = ref<Payment | null>(null)
const editTarget = ref<Payment | null>(null)
const showDetail = ref(false)
const showCancel = ref(false)

onMounted(() => {
  loadSpecialities()
  loadAgents()
})

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
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as PaymentStatus
      const label = statusLabel[status] || status
      const color = statusColor[status] || ''
      return h('div', { class: 'flex items-center gap-1.5' }, [
        // h('span', { class: 'size-1.5 rounded-full bg-current' }),
        h('span', { class: cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', color) }, label),
      ])
    },
  },
  {
    accessorKey: 'speciality',
    header: 'Spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('speciality') || '-'),
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
    id: 'actions',
    header: () => h('div', { class: 'text-center' }, 'Actions'),
    cell: ({ row }) => {
      const p = row.original
      const isNew = p.status === 'paid'
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Renvoyer le code',
          onClick: () => handleResendCode(p.phone),
        }, h(Send, { class: 'size-[14px]' })),
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Imprimer',
          onClick: () => printPayment(p),
        }, h(Printer, { class: 'size-[14px]' })),
        isAdmin
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
              title: 'Modifier',
              onClick: () => { editTarget.value = p },
            }, h(Pencil, { class: 'size-[14px]' }))
          : null,
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Détails',
          onClick: () => { detailPayment.value = p; showDetail.value = true },
        }, h(Eye, { class: 'size-[14px]' })),
        isNew
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-destructive/70 hover:text-destructive hover:border-destructive/30 transition',
              title: 'Annuler',
              onClick: () => { cancelTarget.value = p; showCancel.value = true },
            }, h(XCircle, { class: 'size-[14px]' }))
          : null,
      ])
    },
  },
]

const statusFilter = ref('')
const specialityFilter = ref('')
const searchQuery = ref('')

const {
  table,
  isLoading,
  refetch,
  globalFilter,
  columnFilters,
  total,
} = useServerDataTable<Payment>({
  queryKey: ['payments'],
  columns,
  fetcher,
  staleTime: 30_000,
})

function applyFilters() {
  columnFilters.value = [
    ...(statusFilter.value ? [{ id: 'namespace' as const, value: statusFilter.value }] : []),
    ...(specialityFilter.value ? [{ id: 'speciality' as const, value: specialityFilter.value }] : []),
  ]
}

function resetFilters() {
  statusFilter.value = ''
  specialityFilter.value = ''
  searchQuery.value = ''
  globalFilter.value = ''
  columnFilters.value = []
}

async function handleResendCode(phone: string) {
  try {
    await resendCode(phone)
    toast('Code renvoyé', { description: `Un nouveau code a été envoyé au ${phone}.` })
  }
  catch {
    toast.error('Échec du renvoi', { description: 'Impossible d\'envoyer le code.' })
  }
}

async function handleCancelConfirm() {
  if (!cancelTarget.value)
    return
  const target = cancelTarget.value
  try {
    await cancelPayment(target)
    showCancel.value = false
    cancelTarget.value = null
    toast('Paiement annulé', { description: `Le code ${target.code} a été annulé.` })
  }
  catch {
    toast.error('Échec de l\'annulation', { description: 'Une erreur est survenue lors de l\'annulation.' })
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Filter Card -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Statut</label>
            <Select v-model="statusFilter" @update:model-value="applyFilters">
              <SelectTrigger class="min-w-[160px]">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="opt in statusOptions.filter(o => o.value)" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Spécialité</label>
            <Select v-model="specialityFilter" @update:model-value="applyFilters">
              <SelectTrigger class="min-w-[200px]">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="s in specialities" :key="s.id" :value="s.id">
                  {{ s.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
            <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
            Réinitialiser
          </Button>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ total }} résultat(s)
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Toolbar -->
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
        <button class="btn-primary h-10 text-[13px]" @click="navigateTo('/payments/validate')">
          <Plus class="size-4" />
          Nouvelles consultations
        </button>
      </div> -->
    </div>

    <!-- Table -->
    <AppDataTable :table="table" :is-loading="isLoading" />

    <!-- Pagination -->
    <AppPagination :table="table" :total="total" />

    <!-- Detail Modal -->
    <Dialog v-model:open="showDetail">
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails du paiement</DialogTitle>
          <DialogDescription>Informations complètes de la consultation.</DialogDescription>
        </DialogHeader>
        <template v-if="detailPayment">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-mono font-semibold text-lg">{{ detailPayment.code }}</span>
              <span
                class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset"
                :class="statusColor[detailPayment.status] || ''"
              >
                <span class="size-1.5 rounded-full bg-current" />
                {{ statusLabel[detailPayment.status] || detailPayment.status }}
              </span>
            </div>
            <Separator />
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  Patient
                </div>
                <div class="font-medium">
                  {{ getPatientName(detailPayment) }}
                </div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  Montant
                </div>
                <div class="font-semibold">
                  {{ formatAmount(detailPayment.amount) }}
                </div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  Spécialité
                </div>
                <div>{{ detailPayment.speciality || '-' }}</div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  Praticien
                </div>
                <div>{{ detailPayment.praticien || '-' }}</div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  N° payeur
                </div>
                <div class="font-mono">
                  {{ detailPayment.phone || '-' }}
                </div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground font-medium">
                  Date de paiement
                </div>
                <div>{{ formatDate(detailPayment.paid_at) }}</div>
              </div>
              <div v-if="detailPayment.validateur">
                <div class="text-[11px] text-muted-foreground font-medium">
                  Validé par
                </div>
                <div>{{ detailPayment.validateur }}</div>
              </div>
              <div v-if="detailPayment.validated_at">
                <div class="text-[11px] text-muted-foreground font-medium">
                  Validé le
                </div>
                <div>{{ formatDate(detailPayment.validated_at) }}</div>
              </div>
              <div v-if="detailPayment.canceled_at">
                <div class="text-[11px] text-muted-foreground font-medium">
                  Annulé le
                </div>
                <div>{{ formatDate(detailPayment.canceled_at) }}</div>
              </div>
              <div v-if="detailPayment.expiry_at">
                <div class="text-[11px] text-muted-foreground font-medium">
                  Expiré le
                </div>
                <div>{{ detailPayment.expiry_at ? new Date(detailPayment.expiry_at).toLocaleDateString('fr-FR') : '-' }}</div>
              </div>
            </div>
          </div>
        </template>
        <DialogFooter class="gap-2">
          <Button variant="outline" @click="showDetail = false">
            Fermer
          </Button>
          <Button v-if="detailPayment" @click="printPayment(detailPayment)">
            <Printer class="size-4 mr-1.5" /> Imprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Edit Dialog -->
    <EditPaymentForm :payment="editTarget" @close="editTarget = null" />

    <!-- Cancel Dialog -->
    <Dialog v-model:open="showCancel">
      <DialogContent class="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Annuler ce paiement</DialogTitle>
          <DialogDescription>
            Le code <strong>{{ cancelTarget?.code }}</strong> sera marqué comme annulé.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="gap-2">
          <Button variant="outline" @click="showCancel = false">
            Annuler
          </Button>
          <Button variant="destructive" @click="handleCancelConfirm">
            <XCircle class="size-4 mr-1.5" /> Annuler le paiement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
