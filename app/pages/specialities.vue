<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Speciality } from '~/composables/useSpecialities'
import { Pencil, Plus, RotateCw, Search, Trash2 } from 'lucide-vue-next'
import { h, ref } from 'vue'
import { toast } from 'vue-sonner'
import SpecialityForm from '@/components/form/SpecialityForm.vue'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { useSpecialities } from '~/composables/useSpecialities'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const { fetcher, deleteSpeciality } = useSpecialities()

const openForm = ref(false)
const selectedSpeciality = ref<Speciality | null>(null)
const deleteTarget = ref<Speciality | null>(null)
const showDelete = ref(false)
const deleting = ref(false)

const hasAccess = computed(() => can('specialities', 'list') || can('specialities', 'create') || can('specialities', 'update') || can('specialities', 'delete'))

function formatDate(dateStr: string | null): string {
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

function openAdd() {
  selectedSpeciality.value = null
  openForm.value = true
}

function openEdit(spec: Speciality) {
  selectedSpeciality.value = spec
  openForm.value = true
}

function confirmDelete(spec: Speciality) {
  deleteTarget.value = spec
  showDelete.value = true
}

async function handleDelete() {
  if (!deleteTarget.value)
    return
  deleting.value = true
  try {
    await deleteSpeciality(deleteTarget.value.id)
    toast('Spécialité supprimée', { description: 'La spécialité a été supprimée avec succès.' })
    showDelete.value = false
    deleteTarget.value = null
  }
  catch {
    toast.error('Erreur', { description: 'Impossible de supprimer cette spécialité.' })
  }
  finally {
    deleting.value = false
  }
}

const columns: ColumnDef<Speciality>[] = [
  {
    accessorKey: 'name',
    header: 'Spécialité',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.getValue('name') || '-'),
  },
  {
    accessorKey: 'type_sp',
    header: 'Type',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('type_sp') || '-'),
  },
  {
    accessorKey: 'created_at',
    header: 'Créé le',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, formatDate(row.getValue('created_at'))),
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right text-xs font-medium text-muted-foreground uppercase tracking-wider' }, 'Actions'),
    cell: ({ row }) => {
      const spec = row.original
      const hasUpdate = can('specialities', 'update')
      const hasDelete = can('specialities', 'delete')
      if (!hasUpdate && !hasDelete)
        return null
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        hasUpdate
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
              title: 'Modifier',
              onClick: () => openEdit(spec),
            }, h(Pencil, { class: 'size-[14px]' }))
          : null,
        hasDelete
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-destructive/70 hover:text-destructive hover:border-destructive/30 transition',
              title: 'Supprimer',
              onClick: () => confirmDelete(spec),
            }, h(Trash2, { class: 'size-[14px]' }))
          : null,
      ])
    },
  },
]

const {
  table,
  isLoading,
  refetch,
  globalFilter,
  total,
} = useServerDataTable<Speciality>({
  queryKey: 'specialities',
  columns,
  fetcher,
  staleTime: 30_000,
})
</script>

<template>
  <ClientOnly>
    <template v-if="isPermissionsReady">
      <div v-if="hasAccess" class="space-y-6">
      <!-- Toolbar -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            v-model="globalFilter"
            type="text"
            placeholder="Rechercher..."
            class="field-input pl-9"
          >
        </div>
        <div class="flex items-center gap-2">
          <!-- <Button variant="outline" size="sm" class="h-10" @click="refetch()">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button> -->
          <Button v-if="can('specialities', 'create')" class="btn-primary h-10 text-[13px]" @click="openAdd">
            <Plus class="size-4" />
            Ajouter
          </Button>
        </div>
      </div>

      <AppDataTable :table="table" :is-loading="isLoading" />

      <AppPagination :table="table" :total="total" />

      <!-- Speciality Form Dialog -->
      <SpecialityForm v-model:open="openForm" :speciality="selectedSpeciality" />

      <!-- Delete Confirmation -->
      <AlertDialog v-model:open="showDelete">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment supprimer la spécialité <strong>{{ deleteTarget?.name }}</strong> ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel :disabled="deleting">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction variant="destructive" :disabled="deleting" @click="handleDelete">
              {{ deleting ? 'Suppression...' : 'Oui, supprimer' }}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 class="text-3xl font-bold text-muted-foreground">
        404 - Page introuvable!
      </h1>
      <p class="text-muted-foreground mt-2">
        Vous n'avez pas accès à cette page
      </p>
    </div>
    </template>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
