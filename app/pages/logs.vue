<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { LogEntry } from '~/types/log'
import { Download, RotateCw, Search } from 'lucide-vue-next'
import { h, onMounted, ref } from 'vue'
import { useLogs } from '~/composables/useLogs'
import { usePermissions } from '~/composables/usePermissions'
import { useServerDataTable } from '~/composables/useServerDataTable'

definePageMeta({
  requiresAuth: true,
})

const { can, isPermissionsReady } = usePermissions()
const hasAccess = computed(() => can('log'))

const logs = useLogs()

const messageDialogOpen = ref(false)
const selectedMessage = ref('')
const selectedAgent = ref('')
const searchCode = ref('')
const dateDebut = ref('')
const dateFin = ref('')

const columns: ColumnDef<LogEntry>[] = [
  {
    accessorKey: 'module',
    header: 'Module',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('module') || '-'),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('action') || '-'),
  },
  {
    accessorKey: 'user',
    header: 'Utilisateur',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.getValue('user') || '-'),
  },
  {
    accessorKey: 'user_name',
    header: 'Validé par',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.getValue('user_name') || '-'),
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('code') || '-'),
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => h('button', { class: 'text-sm text-muted-foreground max-w-[300px] truncate text-left cursor-pointer hover:underline', onClick: () => { selectedMessage.value = row.getValue('message') || '-'; messageDialogOpen.value = true } }, row.getValue('message') || '-'),
  },

]

const {
  table,
  isLoading,
  globalFilter,
  columnFilters,
  total,
} = useServerDataTable<LogEntry>({
  queryKey: ['logs'],
  columns,
  fetcher: logs.fetcher,
  initialPageSize: 15,
  staleTime: 30_000,
})

onMounted(() => {
  if (hasAccess.value) {
    logs.loadAgents()
  }
})

const dateError = ref('')

function applyFilters() {
  const hasDebut = !!dateDebut.value
  const hasFin = !!dateFin.value

  if ((hasDebut && !hasFin) || (!hasDebut && hasFin)) {
    dateError.value = 'Les deux dates doivent être renseignées ou laisser vides.'
    return
  }

  dateError.value = ''
  const filters: { id: string, value: any }[] = []
  if (selectedAgent.value)
    filters.push({ id: 'agent', value: selectedAgent.value })
  if (searchCode.value)
    filters.push({ id: 'code', value: searchCode.value })
  if (dateDebut.value)
    filters.push({ id: 'date_debut', value: dateDebut.value })
  if (dateFin.value)
    filters.push({ id: 'date_fin', value: dateFin.value })
  columnFilters.value = filters
}

function resetFilters() {
  selectedAgent.value = ''
  searchCode.value = ''
  dateDebut.value = ''
  dateFin.value = ''
  globalFilter.value = ''
  columnFilters.value = []
  dateError.value = ''
}

async function handleExport() {
  const model: Record<string, any> = {}
  if (selectedAgent.value)
    model.agent = selectedAgent.value
  if (searchCode.value)
    model.code = searchCode.value
  if (dateDebut.value)
    model.date_debut = dateDebut.value
  if (dateFin.value)
    model.date_fin = dateFin.value
  await logs.exportLogs(model)
}
</script>

<template>
  <ClientOnly>
    <div v-if="hasAccess" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">
            Journal d'activités
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            Consultez l'historique des actions effectuées sur la plateforme
          </p>
        </div>
      </div>

      <!-- Filter Card -->
      <Card>
        <CardContent class="p-4">
          <div class="flex flex-wrap items-end gap-4">
            <div class="space-y-1.5">
              <label class="text-[12px] font-medium text-muted-foreground">Agent</label>
              <Select v-model="selectedAgent">
                <SelectTrigger class="min-w-[200px]">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="a in logs.agents?.value" :key="a.id" :value="a.id">
                    {{ a.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[12px] font-medium text-muted-foreground">Code</label>
              <input v-model="searchCode" type="text" placeholder="Code consultation" class="field-input min-w-[160px]">
            </div>
            <div class="space-y-1.5 flex flex-col">
              <label class="text-[12px] font-medium text-muted-foreground">Date début</label>
              <AppDatePicker v-model="dateDebut" placeholder="Date début" />
            </div>
            <div class="space-y-1.5 flex flex-col">
              <label class="text-[12px] font-medium text-muted-foreground">Date fin</label>
              <AppDatePicker v-model="dateFin" :min="dateDebut" placeholder="Date fin" />
            </div>
            <Button variant="default" size="sm" class="h-10" @click="applyFilters">
              Filtrer
            </Button>
            <Button variant="ghost" size="sm" class="h-10" @click="resetFilters">
              <Icon name="i-lucide-rotate-ccw" class="size-4 mr-1" />
              Réinitialiser
            </Button>
            <p v-if="dateError" class="w-full text-[12px] text-destructive font-medium">
              {{ dateError }}
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Toolbar -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input v-model="globalFilter" type="text" placeholder="Rechercher..." class="field-input pl-9">
        </div>
        <div class="flex items-center gap-2">
          <!-- <div class="text-[13px] text-muted-foreground mr-2">
            {{ total }} résultat(s)
          </div>
          <Button variant="outline" size="sm" class="h-10" @click="refetch()">
            <RotateCw class="size-4 mr-1.5" />
            Actualiser
          </Button> -->
          <Button variant="default" size="sm" class="h-10" :disabled="logs.isExporting" @click="handleExport">
            <Download class="size-4 mr-1.5" />
            Exporter
          </Button>
        </div>
      </div>

      <AppDataTable :table="table" :is-loading="isLoading" :loading-row-count="8" />

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
    <Dialog v-model:open="messageDialogOpen">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Message</DialogTitle>
          <DialogDescription class="sr-only">
            Message détaillé
          </DialogDescription>
        </DialogHeader>
        <p class="text-sm text-muted-foreground whitespace-pre-wrap wrap-break-word">
          {{ selectedMessage }}
        </p>
        <DialogFooter>
          <Button variant="outline" @click="messageDialogOpen = false">
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ClientOnly>
</template>
