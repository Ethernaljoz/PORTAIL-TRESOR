<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import type { FilterConfig } from './types'
import { FlexRender } from '@tanstack/vue-table'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'

interface DataTableProps {
  table: Table<TData>
  isLoading?: boolean
  dateRange?: { start: string | null, end: string | null }
  filters?: FilterConfig[]
  searchColumn?: string
}

const props = defineProps<DataTableProps>()
const emit = defineEmits(['update:dateRange'])

const internalDateRange = computed({
  get: () => props.dateRange,
  set: val => emit('update:dateRange', val),
})
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar
      v-model:date-range="internalDateRange" :table="table" :filters="filters"
      :search-column="searchColumn"
    />
    <div class="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="i in 5" :key="i">
              <TableCell v-for="j in table.getAllColumns().length" :key="j" class="h-12">
                <div class="h-4 w-full animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="table.getAllColumns().length" class="h-44 text-center">
              Aucun résultat.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
