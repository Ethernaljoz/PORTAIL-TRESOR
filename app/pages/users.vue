<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { UserListItem } from '~/composables/useUsers'
import { Pencil, Plus, Search, Shield, Trash2 } from 'lucide-vue-next'
import { h, ref } from 'vue'
import { toast } from 'vue-sonner'
import GrantForm from '@/components/form/GrantForm.vue'
import UserForm from '@/components/form/UserForm.vue'
import { useAuth } from '~/composables/useAuth'
import { usePermissions } from '~/composables/usePermissions'
import { useServerDataTable } from '~/composables/useServerDataTable'
import { useUsers } from '~/composables/useUsers'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const hasAccess = computed(() => can('users', 'list') || can('users', 'create') || can('users', 'update') || can('users', 'delete') || can('users', 'grant'))

const users = useUsers()
const { user } = useAuth()

const openModal = ref(false)
const grantModal = ref(false)
const selectedUser = ref<UserListItem | null>(null)
const grantTarget = ref<UserListItem | null>(null)
const deleteTarget = ref<UserListItem | null>(null)
const showDelete = ref(false)

function profileLabel(profile: string): string {
  return profile === '2' ? 'Administrateur' : 'Agent'
}

const columns: ColumnDef<UserListItem>[] = [
  {
    accessorKey: 'last_name',
    header: 'Nom',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.getValue('last_name') || '-'),
  },
  {
    accessorKey: 'first_name',
    header: 'Prénom',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('first_name') || '-'),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.getValue('email') || '-'),
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
  },
  {
    accessorKey: 'profile',
    header: 'Profil',
    cell: ({ row }) => {
      const profile = row.getValue('profile') as string
      const label = profileLabel(profile.toString())
      const isAdmin = profile === '2'
      return h('span', {
        class: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${isAdmin ? 'text-primary bg-primary/10 ring-primary/20' : 'text-muted-foreground bg-muted ring-border'}`,
      }, label)
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-center' }, 'Actions'),
    cell: ({ row }) => {
      const u = row.original
      const buttons = []
      if (can('users', 'grant')) {
        buttons.push(h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Privilèges',
          onClick: () => { grantTarget.value = u; grantModal.value = true },
        }, h(Shield, { class: 'size-[14px]' })))
      }
      if (can('users', 'update')) {
        buttons.push(h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
          title: 'Modifier',
          onClick: () => { selectedUser.value = u; openModal.value = true },
        }, h(Pencil, { class: 'size-[14px]' })))
      }
      if (can('users', 'delete') && user.value?.id !== u.id) {
        buttons.push(h('button', {
          class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-destructive/70 hover:text-destructive hover:border-destructive/30 transition',
          title: 'Supprimer',
          onClick: () => { deleteTarget.value = u; showDelete.value = true },
        }, h(Trash2, { class: 'size-[14px]' })))
      }
      return h('div', { class: 'flex items-center justify-end gap-1' }, buttons)
    },
  },
]

const {
  table,
  isLoading,
  refetch,
  globalFilter,
  total,
} = useServerDataTable<UserListItem>({
  queryKey: ['users'],
  columns,
  fetcher: users.fetcher,
  initialPageSize: 15,
  staleTime: 30_000,
})

async function handleDelete() {
  if (!deleteTarget.value)
    return
  try {
    await users.deleteUser(deleteTarget.value.id)
    toast('Utilisateur supprimé', { description: 'L\'utilisateur a été supprimé avec succès.' })
    showDelete.value = false
    deleteTarget.value = null
  }
  catch {
    toast.error('Erreur', { description: 'Impossible de supprimer cet utilisateur.' })
  }
}
</script>

<template>
  <ClientOnly>
    <div v-if="hasAccess" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">
            Utilisateurs
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            Liste des utilisateurs inscrits sur la plateforme
          </p>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            v-model="globalFilter" type="text" placeholder="Rechercher par nom, email ou téléphone..."
            class="field-input pl-9"
          >
        </div>
        <div class="flex items-center gap-2">
          <!-- <div class="text-[13px] text-muted-foreground mr-2">
            {{ total }} résultat(s)
          </div> -->
          <!-- <Button variant="outline" size="sm" class="h-10" @click="refetch()">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button> -->
          <Button v-if="can('users', 'create')" class="h-10 text-[13px]" @click="openModal = true">
            <Plus class="size-4 mr-1.5" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      <AppDataTable :table="table" :is-loading="isLoading" empty-message="Aucun utilisateur trouvé." />

      <AppPagination :table="table" :total="total" />

      <UserForm v-model:open="openModal" :user="selectedUser" />
      <GrantForm v-model:open="grantModal" :user="grantTarget" />
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
        <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Chargement...</span>
      </div>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
              class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>

  <!-- Delete confirmation -->
  <AlertDialog v-model:open="showDelete">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
        <AlertDialogDescription>
          Voulez-vous vraiment supprimer l'utilisateur <strong>{{ deleteTarget?.last_name }} {{ deleteTarget?.first_name
          }}</strong> ? Cette action est irréversible.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="deleteTarget = null">
          Annuler
        </AlertDialogCancel>
        <AlertDialogAction variant="destructive" @click="handleDelete">
          Supprimer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
