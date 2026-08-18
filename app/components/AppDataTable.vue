<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import { FlexRender } from '@tanstack/vue-table'

interface Props {
  table: Table<TData>
  isLoading?: boolean
  emptyMessage?: string
  loadingRowCount?: number
  variant?: 'bordered' | 'card'
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  emptyMessage: 'Aucun résultat.',
  loadingRowCount: 5,
  variant: 'bordered',
})
</script>

<template>
  <Card v-if="variant === 'card'">
    <CardContent class="p-0">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id" class="h-11 px-4">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="i in loadingRowCount" :key="i">
              <TableCell v-for="j in table.getAllColumns().length" :key="j" class="h-12">
                <div class="h-4 w-full animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="table.getRowModel().rows.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-muted/50 transition-colors">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-4 py-3">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="table.getAllColumns().length" class="h-44 text-center text-muted-foreground">
              {{ emptyMessage }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  <div v-else class="overflow-hidden rounded-lg border">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id" class="h-11 px-4">
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="isLoading">
          <TableRow v-for="i in loadingRowCount" :key="i">
            <TableCell v-for="j in table.getAllColumns().length" :key="j" class="h-12">
              <div class="h-4 w-full animate-pulse rounded bg-muted" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="table.getRowModel().rows.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-muted/50 transition-colors">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-4 py-3">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <TableRow v-else>
          <TableCell :colspan="table.getAllColumns().length" class="h-44 text-center text-muted-foreground">
            {{ emptyMessage }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
