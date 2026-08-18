<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'

interface Props {
  table: Table<TData>
  total?: number
}

defineProps<Props>()

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | 'ellipsis')[] = [1]
  if (current > 3) {
    pages.push('ellipsis')
  }
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (current < total - 2) {
    pages.push('ellipsis')
  }
  if (total > 1) {
    pages.push(total)
  }
  return pages
}
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="text-sm text-muted-foreground">
      Page {{ table.getState().pagination.pageIndex + 1 }} sur {{ table.getPageCount() }}<span v-if="total != null"> &mdash; {{ total }} résultat(s)</span>
    </div>
    <div class="flex items-center gap-1">
      <button
        class="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition disabled:opacity-30 disabled:pointer-events-none"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <Icon name="i-lucide-chevron-left" class="size-4" />
      </button>
      <template v-for="p in getPageNumbers(table.getState().pagination.pageIndex + 1, table.getPageCount())" :key="p">
        <span v-if="p === 'ellipsis'" class="flex size-8 items-center justify-center text-muted-foreground text-sm">&hellip;</span>
        <button
          v-else
          class="flex size-8 items-center justify-center rounded-full text-sm font-medium transition"
          :class="p === table.getState().pagination.pageIndex + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
          @click="table.setPageIndex(p - 1)"
        >
          {{ p }}
        </button>
      </template>
      <button
        class="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition disabled:opacity-30 disabled:pointer-events-none"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        <Icon name="i-lucide-chevron-right" class="size-4" />
      </button>
    </div>
  </div>
</template>
