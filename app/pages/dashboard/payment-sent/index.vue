<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { PaiementEnvoye } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const { paiementsEnvoyes } = useTransactionsData()

const statutFilter = ref('')

const statutOptions = [
  { label: 'Tous', value: '' },
  { label: 'Reussi', value: 'Réussi' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Echoue', value: 'Échoué' },
]

const filteredData = computed(() => {
  return paiementsEnvoyes.value.filter(p => {
    if (statutFilter.value && p.statut !== statutFilter.value) return false
    return true
  })
})

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

const totalEnvoyes = computed(() => filteredData.value.reduce((sum, p) => sum + p.montant, 0))

const columns: ColumnDef<PaiementEnvoye>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.getValue('id')),
  },
  {
    accessorKey: 'beneficiaire',
    header: 'Beneficiaire',
    cell: ({ row }) => h('span', { class: 'text-xs font-medium' }, row.getValue('beneficiaire')),
  },
  {
    accessorKey: 'pspBeneficiaire',
    header: 'PSP',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground' }, row.getValue('pspBeneficiaire')),
  },
  {
    accessorKey: 'motif',
    header: 'Motif',
    cell: ({ row }) => h('span', { class: 'text-xs' }, row.getValue('motif')),
  },
  {
    accessorKey: 'institution',
    header: 'Institution',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground max-w-[150px] truncate block' }, row.getValue('institution')),
  },
  {
    accessorKey: 'montant',
    header: 'Montant',
    cell: ({ row }) => h('span', { class: 'text-xs font-semibold font-mono' }, formatMontant(row.getValue('montant') as number)),
  },
  {
    accessorKey: 'reference',
    header: 'Reference',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.getValue('reference')),
  },
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string
      return h('span', { class: ['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(statut)] }, statut)
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, row.getValue('date')),
  },
]

const table = useVueTable({
  get data() { return filteredData.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: 10 } },
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Paiements envoyes</h1>
        <p class="text-sm text-muted-foreground mt-1">Historique des paiements sortants</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Total paiements</div>
          <div class="text-2xl font-bold mt-1">{{ filteredData.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Montant total</div>
          <div class="text-2xl font-bold mt-1">{{ (totalEnvoyes / 1000000).toFixed(1) }}M XOF</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">En attente</div>
          <div class="text-2xl font-bold mt-1 text-amber-600">{{ filteredData.filter(p => p.statut === 'En attente').length }}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <AppSelectInput v-model="statutFilter" :options="statutOptions" label="Statut" trigger-class="min-w-[140px]" />
          <p class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredData.length }} resultat(s)
          </p>
        </div>
      </CardContent>
    </Card>

    <AppDataTable :table="table" />
    <AppPagination :table="table" :total="filteredData.length" />
  </div>
</template>
