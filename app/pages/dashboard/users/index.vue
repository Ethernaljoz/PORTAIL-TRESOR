<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { Utilisateur } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const { utilisateurs } = useUsersData()

const roleFilter = ref('')
const statutFilter = ref('')

const roleOptions = computed(() => {
  const roles = [...new Set(utilisateurs.value.map(u => u.role))]
  return [{ label: 'Tous', value: '' }, ...roles.map(r => ({ label: r, value: r }))]
})

const statutOptions = [
  { label: 'Tous', value: '' },
  { label: 'Actif', value: 'Actif' },
  { label: 'Inactif', value: 'Inactif' },
  { label: 'En attente', value: 'En attente' },
]

const filteredData = computed(() => {
  return utilisateurs.value.filter(u => {
    if (roleFilter.value && u.role !== roleFilter.value) return false
    if (statutFilter.value && u.statut !== statutFilter.value) return false
    return true
  })
})

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'Inactif': 'text-destructive bg-destructive/10 ring-destructive/20',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function roleColor(role: string): string {
  const map: Record<string, string> = {
    'Administrateur': 'text-red-600 bg-red-50',
    'Superviseur': 'text-purple-600 bg-purple-50',
    'Gestionnaire': 'text-blue-600 bg-blue-50',
    'Opérateur': 'text-emerald-600 bg-emerald-50',
    'Lecteur': 'text-muted-foreground bg-muted',
  }
  return map[role] || 'text-muted-foreground bg-muted'
}

const columns: ColumnDef<Utilisateur>[] = [
  {
    accessorKey: 'prenom',
    header: 'Nom',
    cell: ({ row }) => {
      const u = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'size-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary shrink-0' }, `${u.prenom[0]}${u.nom[0]}`),
        h('div', {}, [
          h('div', { class: 'text-sm font-medium' }, `${u.prenom} ${u.nom}`),
          h('div', { class: 'text-[11px] text-muted-foreground' }, u.telephone),
        ]),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground' }, row.getValue('email')),
  },
  {
    accessorKey: 'institution',
    header: 'Institution',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground max-w-[150px] truncate block' }, row.getValue('institution')),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return h('span', { class: ['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', roleColor(role)] }, role)
    },
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
    accessorKey: 'derniereConnexion',
    header: 'Derniere connexion',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, (row.getValue('derniereConnexion') as string) || 'Jamais'),
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
  roleFilter.value = ''
  statutFilter.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Utilisateurs</h1>
        <p class="text-sm text-muted-foreground mt-1">Gestion des utilisateurs de la plateforme</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvel utilisateur
      </button>
    </div>

    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <AppSelectInput v-model="roleFilter" :options="roleOptions" label="Role" trigger-class="min-w-[160px]" />
          <AppSelectInput v-model="statutFilter" :options="statutOptions" label="Statut" trigger-class="min-w-[140px]" />
          <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
            <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
            Reinitialiser
          </Button>
          <p class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredData.length }} utilisateur(s)
          </p>
        </div>
      </CardContent>
    </Card>

    <AppDataTable :table="table" />
    <AppPagination :table="table" :total="filteredData.length" />
  </div>
</template>
