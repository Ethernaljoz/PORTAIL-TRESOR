<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Payment } from '~/types/payment'
import { Plus, RotateCw } from 'lucide-vue-next'
import { h, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import { usePermissions } from '~/composables/usePermissions'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { useVerify } from '~/composables/useVerify'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const hasAccess = computed(() => can('verify', 'list') || can('verify', 'check') || can('verify', 'create'))

const verify = useVerify()

const dateDebut = ref('')
const dateFin = ref('')
const phoneSearch = ref('')
const createTarget = ref<Payment | null>(null)
const showConfirm = ref(false)
const isCreating = ref(false)

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

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'consultation',
    header: 'Type de consultation',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('consultation') || '-'),
  },
  {
    accessorKey: 'phone',
    header: 'Numéro',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => h('span', { class: 'text-sm font-semibold text-right block' }, formatAmount(row.getValue('amount'))),
  },
  {
    accessorKey: 'created_at',
    header: 'Date et heure opération',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('created_at'))),
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-center' }, 'Actions'),
    cell: ({ row }) => {
      const p = row.original
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-success hover:text-success/80 hover:border-success/30 transition',
          title: 'Créer le paiement',
          onClick: () => { createTarget.value = p; showConfirm.value = true },
        }, h(Plus, { class: 'size-[14px]' })),
      ])
    },
  },
]

const {
  table,
  isLoading,
  refetch,
  columnFilters,
  total,
} = useServerDataTable<Payment>({
  queryKey: ['payments-verify'],
  columns,
  fetcher: verify.fetcher,
  initialPageSize: 15,
  staleTime: 30_000,
})

onMounted(() => {
  if (hasAccess.value) {
    const today = new Date().toISOString().split('T')[0]
    dateDebut.value = today
    dateFin.value = today
    applyFilters()
  }
})

function applyFilters() {
  const filters: { id: string, value: any }[] = []
  if (dateDebut.value)
    filters.push({ id: 'date_debut', value: dateDebut.value })
  if (dateFin.value)
    filters.push({ id: 'date_fin', value: dateFin.value })
  if (phoneSearch.value)
    filters.push({ id: 'search', value: phoneSearch.value })
  columnFilters.value = filters
}

function resetFilters() {
  const today = new Date().toISOString().split('T')[0]
  dateDebut.value = today
  dateFin.value = today
  phoneSearch.value = ''
  columnFilters.value = []
}

async function handleCreate() {
  if (!createTarget.value)
    return
  isCreating.value = true
  try {
    await verify.createAfterFail(createTarget.value.id)
    toast('Paiement créé', { description: 'Le paiement a été recréé avec succès.' })
    showConfirm.value = false
    createTarget.value = null
  }
  catch {
    toast.error('Erreur', { description: 'Une erreur est survenue lors de la création du paiement.' })
  }
  finally {
    isCreating.value = false
  }
}
</script>

<template>
  <ClientOnly>
    <div v-if="hasAccess" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">
            Paiements à vérifier
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            Consultez et recréez les paiements échoués
          </p>
        </div>
      </div>

      <!-- Filter Card -->
      <Card>
        <CardContent class="p-4">
          <div class="flex flex-wrap items-end gap-4">
            <div class="space-y-1.5">
              <label class="text-[12px] font-medium text-muted-foreground">Date début</label>
              <AppDatePicker v-model="dateDebut" placeholder="Date début" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[12px] font-medium text-muted-foreground">Date fin</label>
              <AppDatePicker v-model="dateFin" :min="dateDebut" placeholder="Date fin" />
            </div>
            <div class="space-y-1.5">
              <label class="text-[12px] font-medium text-muted-foreground">Numéro</label>
              <input
                v-model="phoneSearch" type="number" placeholder="Numéro payeur"
                class="field-input min-w-[180px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              >
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

      <!-- Toolbar -->
      <div class="flex items-center justify-between gap-4">
        <div class="text-[13px] text-muted-foreground">
          {{ total }} résultat(s)
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="h-10" @click="refetch()">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button>
        </div>
      </div>

      <AppDataTable :table="table" :is-loading="isLoading" />

      <AppPagination :table="table" :total="total" />
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
        <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
        <span>Chargement...</span>
      </div>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>

  <!-- AlertDialog confirmation -->
  <AlertDialog v-model:open="showConfirm">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation</AlertDialogTitle>
        <AlertDialogDescription>
          Voulez-vous vraiment créer ce paiement ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="createTarget = null">
          Annuler
        </AlertDialogCancel>
        <AlertDialogAction :disabled="isCreating" @click="handleCreate">
          {{ isCreating ? 'Création...' : 'Oui, créer' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
