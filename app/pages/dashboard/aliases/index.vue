<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { Alias } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const { alias } = useServicesData()

const institutionFilter = ref('')
const searchRef = ref('')

const institutionOptions = computed(() => {
  const names = [...new Set(alias.value.map(a => a.institution))]
  return [{ label: 'Toutes', value: '' }, ...names.map(n => ({ label: n, value: n }))]
})

const filteredData = computed(() => {
  return alias.value.filter(a => {
    if (institutionFilter.value && a.institution !== institutionFilter.value) return false
    if (searchRef.value) {
      const q = searchRef.value.toLowerCase()
      return a.nom.toLowerCase().includes(q) || a.service.toLowerCase().includes(q)
    }
    return true
  })
})

function typeColor(type: string): string {
  const map: Record<string, string> = {
    'SHID': 'text-blue-600 bg-blue-50',
    'MCOD': 'text-purple-600 bg-purple-50',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'Inactif': 'text-muted-foreground bg-muted ring-border',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

const columns: ColumnDef<Alias>[] = [
  {
    accessorKey: 'nom',
    header: 'Nom',
    cell: ({ row }) => h('code', { class: 'text-xs font-mono font-medium bg-muted px-2 py-0.5 rounded' }, row.getValue('nom')),
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
    accessorKey: 'institution',
    header: 'Institution',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground max-w-[180px] truncate block' }, row.getValue('institution')),
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => h('span', { class: 'text-xs' }, row.getValue('service')),
  },
  {
    accessorKey: 'compte',
    header: 'Compte',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.getValue('compte')),
  },
  {
    accessorKey: 'nbTransactions',
    header: 'Transactions',
    cell: ({ row }) => h('span', { class: 'text-xs font-semibold' }, (row.getValue('nbTransactions') as number).toLocaleString('fr-FR')),
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
    accessorKey: 'creeLe',
    header: 'Cree le',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, row.getValue('creeLe')),
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
  institutionFilter.value = ''
  searchRef.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Alias</h1>
        <p class="text-sm text-muted-foreground mt-1">Identifiants de routage des paiements</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvel alias
      </button>
    </div>

    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Recherche</label>
            <input v-model="searchRef" type="text" placeholder="Nom ou service..." class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[200px]">
          </div>
          <AppSelectInput v-model="institutionFilter" :options="institutionOptions" label="Institution" trigger-class="min-w-[200px]" />
          <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
            <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
            Reinitialiser
          </Button>
          <p class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredData.length }} alias
          </p>
        </div>
      </CardContent>
    </Card>

    <AppDataTable :table="table" />
    <AppPagination :table="table" :total="filteredData.length" />
  </div>
</template>
