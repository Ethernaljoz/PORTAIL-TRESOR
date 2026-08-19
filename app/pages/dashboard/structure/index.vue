<script setup lang="ts">
import { h, computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import type { Transfert } from '~/types/tresor'

definePageMeta({ requiresAuth: true })

const { structure, comptes, transferts } = useStructureData()

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function formatMontant(val: number): string {
  return val.toLocaleString('fr-FR') + ' XOF'
}

const rootStructure = computed(() => structure.value.filter(s => s.parent === null))
const childStructure = computed(() => structure.value.filter(s => s.parent !== null))

const columns: ColumnDef<Transfert>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.getValue('id')),
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => h('span', { class: 'text-xs font-medium' }, row.getValue('source')),
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground' }, row.getValue('destination')),
  },
  {
    accessorKey: 'montant',
    header: 'Montant',
    cell: ({ row }) => h('span', { class: 'text-xs font-semibold font-mono' }, formatMontant(row.getValue('montant') as number)),
  },
  {
    accessorKey: 'motif',
    header: 'Motif',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground max-w-[200px] truncate block' }, row.getValue('motif')),
  },
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string
      const map: Record<string, string> = {
        'Exécuté': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
        'En cours': 'text-amber-600 bg-amber-50 ring-amber-200',
        'Planifié': 'text-blue-600 bg-blue-50 ring-blue-200',
      }
      return h('span', { class: ['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', map[statut] || 'text-muted-foreground bg-muted'] }, statut)
    },
  },
  {
    accessorKey: 'dateInitiation',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, row.getValue('dateInitiation')),
  },
]

const table = useVueTable({
  get data() { return transferts.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: 10 } },
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold">Structure</h1>
      <p class="text-sm text-muted-foreground mt-1">Organisation de la plateforme et comptes</p>
    </div>

    <!-- Comptes TASC -->
    <div>
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Comptes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-for="compte in comptes" :key="compte.numero" class="hover:shadow-md transition-all">
          <CardContent class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-semibold text-foreground">{{ compte.libelle }}</h3>
                <code class="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded mt-1 inline-block">{{ compte.numero }}</code>
              </div>
              <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statutColor(compte.statut)]">
                {{ compte.statut }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-border">
              <div>
                <div class="text-[11px] text-muted-foreground">Solde total</div>
                <div class="text-lg font-bold mt-0.5">{{ formatMontant(compte.solde) }}</div>
              </div>
              <div>
                <div class="text-[11px] text-muted-foreground">Solde disponible</div>
                <div class="text-lg font-bold mt-0.5 text-primary">{{ formatMontant(compte.soldeDisponible) }}</div>
              </div>
            </div>
            <div class="mt-3 text-[11px] text-muted-foreground">
              Type: {{ compte.type }} | Derniere MAJ: {{ compte.derniereMAJ }}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Organisation -->
    <div>
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Organisation</h2>
      <Card>
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-border">
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Structure</th>
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Responsable</th>
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Utilisateurs</th>
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Services</th>
                  <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-for="s in rootStructure" :key="s.id" class="bg-muted/30 font-semibold">
                  <td class="py-3 px-4 text-sm">{{ s.nom }}</td>
                  <td class="py-3 px-4 text-xs text-muted-foreground">{{ s.type }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.responsable }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.nbUtilisateurs }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.nbServices }}</td>
                  <td class="py-3 px-4">
                    <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(s.statut)]">
                      {{ s.statut }}
                    </span>
                  </td>
                </tr>
                <tr v-for="s in childStructure" :key="s.id" class="hover:bg-muted/50">
                  <td class="py-3 px-4 pl-8 text-sm">{{ s.nom }}</td>
                  <td class="py-3 px-4 text-xs text-muted-foreground">{{ s.type }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.responsable }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.nbUtilisateurs }}</td>
                  <td class="py-3 px-4 text-xs">{{ s.nbServices }}</td>
                  <td class="py-3 px-4">
                    <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(s.statut)]">
                      {{ s.statut }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Transferts recents -->
    <div>
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Transferts recents</h2>
      <AppDataTable :table="table" />
      <AppPagination :table="table" :total="transferts.length" />
    </div>
  </div>
</template>
