<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import type { FilterConfig } from './types'
import { parseDate } from '@internationalized/date'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'

interface DataTableToolbarProps {
  table: Table<TData>
  filters?: FilterConfig[]
  searchColumn?: string
  dateRange?: { start: string | null, end: string | null }
}

const props = defineProps<DataTableToolbarProps>()
const emit = defineEmits(['update:dateRange'])

const isFiltered = computed(() => {
  const hasColumnFilters = props.table.getState().columnFilters.length > 0
  const hasDateFilters = props.dateRange?.start || props.dateRange?.end
  return hasColumnFilters || hasDateFilters
})

// Date range handling
const dateValue = computed({
  get: () => {
    if (!props.dateRange?.start || !props.dateRange?.end)
      return undefined
    return {
      start: parseDate(props.dateRange.start),
      end: parseDate(props.dateRange.end),
    }
  },
  set: (val) => {
    if (val && val.start && val.end) {
      emit('update:dateRange', {
        start: val.start.toString(),
        end: val.end.toString(),
      })
    }
    else {
      emit('update:dateRange', { start: null, end: null })
    }
  },
})

const dateLabel = computed(() => {
  if (!props.dateRange?.start || !props.dateRange?.end)
    return 'Filtrer par date'
  return `${format(new Date(props.dateRange.start), 'dd MMM yyyy', { locale: fr })} - ${format(new Date(props.dateRange.end), 'dd MMM yyyy', { locale: fr })}`
})

function resetFilters() {
  props.table.resetColumnFilters()
  emit('update:dateRange', { start: null, end: null })
}
</script>

<template>
  <div class="flex items-center justify-between gap-2 flex-wrap">
    <div class="flex flex-1 items-center space-x-2 flex-wrap gap-y-2">
      <Input
        v-if="searchColumn" placeholder="Rechercher..."
        :model-value="(table.getState().globalFilter as string) ?? ''" class="h-8 w-[150px] lg:w-[250px]"
        @input="table.setGlobalFilter(($event.target as HTMLInputElement).value)"
      />

      <!-- Dynamic Faceted Filters -->
      <template v-for="filter in filters" :key="filter.column">
        <DataTableFacetedFilter
          v-if="table.getColumn(filter.column)" :column="table.getColumn(filter.column)"
          :title="filter.title" :options="filter.options" :type="filter.type"
        />
      </template>

      <!-- Date Range Filter -->
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline" size="sm" class="h-8 border-dashed flex items-center gap-2"
            :class="!dateRange?.start && 'text-muted-foreground'"
          >
            <CalendarIcon class="h-4 w-4" />
            {{ dateLabel }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <RangeCalendar v-model="dateValue" class="rounded-md border shadow" />
        </PopoverContent>
      </Popover>

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="resetFilters">
        Réinitialiser
        <Icon name="i-radix-icons-cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
