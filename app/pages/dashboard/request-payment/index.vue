<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { DemandePaiement } from '~/types/tresor'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import { Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'

definePageMeta({ requiresAuth: true })

const { demandesPaiement, institutions } = useMockData()

const searchRef = ref('')
const selectedInstitution = ref('')
const selectedStatut = ref('')
const dateDebut = ref('')
const dateFin = ref('')
const isLoading = ref(false)

const filteredData = computed(() => {
  let data = [...demandesPaiement.value]
  if (searchRef.value) {
    const q = searchRef.value.toLowerCase()
    data = data.filter(d => d.reference.toLowerCase().includes(q) || d.usager.toLowerCase().includes(q))
  }
  if (selectedInstitution.value) {
    data = data.filter(d => d.institution === selectedInstitution.value)
  }
  if (selectedStatut.value) {
    data = data.filter(d => d.statut === selectedStatut.value)
  }
  return data
})

function statutColor(statut: string) {
  const map: Record<string, string> = {
    'Réussi': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
    'Expiré': 'text-muted-foreground bg-muted ring-border',
    'Rejeté': 'text-destructive bg-destructive/10 ring-destructive/20',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function formatMontant(val: number): string {
  return `${val.toLocaleString('fr-FR')} XOF`
}

const columns: ColumnDef<DemandePaiement>[] = [
  {
    accessorKey: 'reference',
    header: 'Référence',
    cell: ({ row }) => h('span', { class: 'text-sm font-mono font-medium' }, row.getValue('reference')),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('type')),
  },
  {
    accessorKey: 'usager',
    header: 'Usager',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.getValue('usager')),
  },
  {
    accessorKey: 'institution',
    header: 'Institution',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.getValue('institution')),
  },
  {
    accessorKey: 'montant',
    header: 'Montant',
    cell: ({ row }) => h('span', { class: 'text-sm font-semibold' }, formatMontant(row.getValue('montant') as number)),
  },
  {
    accessorKey: 'echeance',
    header: 'Échéance',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.getValue('echeance')),
  },
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string
      return h('span', { class: ['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statutColor(statut)] }, statut)
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground' }, row.getValue('date')),
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right text-xs font-medium text-muted-foreground uppercase tracking-wider' }, 'Actions'),
    cell: ({ row }) => {
      const p = row.original
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Voir',
          onClick: () => navigateTo(`/dashboard/request-payment/${p.reference}`),
        }, h(Eye, { class: 'size-[14px]' })),
        p.statut === 'En attente'
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
              title: 'Modifier',
            }, h(Pencil, { class: 'size-[14px]' }))
          : null,
        p.statut === 'En attente'
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-destructive/70 hover:text-destructive hover:border-destructive/30 transition',
              title: 'Supprimer',
            }, h(Trash2, { class: 'size-[14px]' }))
          : null,
      ])
    },
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
  searchRef.value = ''
  selectedInstitution.value = ''
  selectedStatut.value = ''
  dateDebut.value = ''
  dateFin.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">
          Demandes de paiement
        </h1>
        <p class="text-sm text-muted-foreground mt-1">
          Gérez les demandes de paiement des usagers
        </p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvelle demande
      </button>
    </div>

    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Recherche</label>
            <input v-model="searchRef" type="text" placeholder="Référence ou usager..." class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[200px]">
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Institution</label>
            <select v-model="selectedInstitution" class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[180px]">
              <option value="">
                Toutes
              </option>
              <option v-for="inst in institutions" :key="inst.id" :value="inst.nom">
                {{ inst.nom }}
              </option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Statut</label>
            <select v-model="selectedStatut" class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[140px]">
              <option value="">
                Tous
              </option>
              <option value="En attente">
                En attente
              </option>
              <option value="Réussi">
                Réussi
              </option>
              <option value="Expiré">
                Expiré
              </option>
              <option value="Rejeté">
                Rejeté
              </option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Date début</label>
            <input v-model="dateDebut" type="date" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Date fin</label>
            <input v-model="dateFin" type="date" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
          </div>
          <Button variant="ghost" size="sm" class="h-9" @click="resetFilters">
            <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
            Réinitialiser
          </Button>
          <p class="w-full text-[12px] text-muted-foreground">
            {{ filteredData.length }} résultat(s)
          </p>
        </div>
      </CardContent>
    </Card>

    <AppDataTable :table="table" :is-loading="isLoading" />
    <AppPagination :table="table" :total="filteredData.length" />
  </div>
</template>
