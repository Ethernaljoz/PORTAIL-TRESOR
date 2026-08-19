<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { Transaction } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const { transactions } = useTransactionsData()

const typeFilter = ref('')
const statutFilter = ref('')

const typeOptions = [
  { label: 'Tous', value: '' },
  { label: 'Recette', value: 'Recette' },
  { label: 'Depense', value: 'Dépense' },
]

const statutOptions = [
  { label: 'Tous', value: '' },
  { label: 'Reussi', value: 'Réussi' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Echoue', value: 'Échoué' },
  { label: 'Annule', value: 'Annulé' },
]

const filteredData = computed(() => {
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

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.getValue('id')),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return h('span', { class: ['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', typeColor(type)] }, type)
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => h('span', { class: 'text-xs max-w-[200px] truncate block' }, row.getValue('description')),
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
    accessorKey: 'dateInitiation',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, row.getValue('dateInitiation')),
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

function resetFilters() {
  typeFilter.value = ''
  statutFilter.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Transactions</h1>
        <p class="text-sm text-muted-foreground mt-1">Historique des transactions financieres</p>
      </div>
    </div>

    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <AppSelectInput v-model="typeFilter" :options="typeOptions" label="Type" trigger-class="min-w-[140px]" />
          <AppSelectInput v-model="statutFilter" :options="statutOptions" label="Statut" trigger-class="min-w-[140px]" />
          <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
            <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
            Reinitialiser
          </Button>
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
