<script setup lang="ts" generic="TData">
import type { Column } from '@tanstack/vue-table'
import type { FilterOption } from './types'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface DataTableFacetedFilterProps {
  column?: Column<TData, any>
  title?: string
  options: FilterOption[]
  type?: 'single' | 'multiple'
}

const props = withDefaults(defineProps<DataTableFacetedFilterProps>(), {
  type: 'multiple',
})

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => {
  const filterValue = props.column?.getFilterValue()
  if (!filterValue)
    return new Set()
  if (Array.isArray(filterValue))
    return new Set(filterValue)
  return new Set([filterValue])
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <Icon name="i-radix-icons-plus-circled" class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden lg:flex space-x-1">
            <Badge v-if="selectedValues.size > 2" variant="secondary" class="rounded-sm px-1 font-normal">
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="item in options
                  .filter((option: any) => selectedValues.has(option.value as any))" :key="String(item.value)"
                variant="secondary" class="rounded-sm px-1 font-normal"
              >
                {{ item.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command
        :filter-function="(list: DataTableFacetedFilterProps['options'], term: any) => list.filter(i => i.label.toLowerCase()?.includes(term))"
      >
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options" :key="String(option.value)" :value="option" @select="(e: any) => {
                const isSelected = selectedValues.has(option.value as any)
                if (props.type === 'single') {
                  if (isSelected) {
                    props.column?.setFilterValue(undefined)
                  }
                  else {
                    props.column?.setFilterValue(option.value)
                  }
                }
                else {
                  if (isSelected) {
                    selectedValues.delete(option.value as any)
                  }
                  else {
                    selectedValues.add(option.value as any)
                  }
                  const filterValues = Array.from(selectedValues)
                  props.column?.setFilterValue(
                    filterValues.length ? filterValues : undefined,
                  )
                }
              }"
            >
              <div
                :class="cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option.value as any)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <Icon name="i-radix-icons-check" :class="cn('h-4 w-4')" />
              </div>
              <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value as any)"
                class="ml-auto h-4 w-4 flex items-center justify-center text-xs font-mono"
              >
                {{ facets.get(option.value as any) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }" class="justify-center text-center"
                @select="props.column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
