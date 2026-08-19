<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const columns: ColumnDef<RequestPayment>[] = [
  {
    accessorKey: 'name',
    header: 'Nom & Prénoms',
    cell: ({ row }) => h('span', { class: 'text-sm font-medium' }, row.getValue('name') || '-'),
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => h('span', { class: 'font-mono text-sm' }, row.getValue('phone') || '-'),
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
      const p = row.original
      const hasUpdate = can('praticiens', 'update')
      const hasDelete = can('praticiens', 'delete')
      if (!hasUpdate && !hasDelete)
        return null
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        hasUpdate
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition',
              title: 'Modifier',
              onClick: () => openEdit(p),
            }, h(Pencil, { class: 'size-[14px]' }))
          : null,
        hasDelete
          ? h('button', {
              class: 'size-8 rounded-lg border border-border bg-card flex items-center justify-center text-destructive/70 hover:text-destructive hover:border-destructive/30 transition',
              title: 'Supprimer',
              onClick: () => confirmDelete(p),
            }, h(Trash2, { class: 'size-[14px]' }))
          : null,
      ])
    },
  },
]
</script>

<template>
  <div>
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
    <AppDataTable :table="table" :is-loading="isLoading" />
    <AppPagination :table="table" :total="total" />
  </div>
</template>
