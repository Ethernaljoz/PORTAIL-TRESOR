<script setup lang="ts" generic="TData">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface Action<TData> {
  label: string
  icon?: string
  disabled?: boolean | ((data: TData) => boolean)
  show?: boolean | ((data: TData) => boolean)
  onClick?: (data: TData) => void
  children?: Action<TData>[]
  variant?: 'default' | 'destructive'
  separator?: boolean
}

interface DataTableRowActionsProps {
  row: Row<TData>
  actions: Action<TData>[]
}

const props = defineProps<DataTableRowActionsProps>()

function resolveBoolean(val: boolean | ((data: TData) => boolean) | undefined, defaultValue: boolean) {
  if (val === undefined)
    return defaultValue
  if (typeof val === 'function')
    return val(props.row.original)
  return val
}

const visibleActions = computed(() => {
  return props.actions.filter(action => resolveBoolean(action.show, true))
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 flex p-0 data-[state=open]:bg-muted">
        <Icon name="i-radix-icons-dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <template v-for="(action, index) in visibleActions" :key="index">
        <DropdownMenuSeparator v-if="action.separator" />

        <DropdownMenuSub v-if="action.children?.length">
          <DropdownMenuSubTrigger>
            <Icon v-if="action.icon" :name="action.icon" class="mr-2 h-4 w-4" />
            <span>{{ action.label }}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <template v-for="(child, childIndex) in action.children" :key="childIndex">
              <DropdownMenuSeparator v-if="child.separator" />
              <DropdownMenuItem
                :disabled="resolveBoolean(child.disabled, false)"
                @click="child.onClick?.(row.original)"
              >
                <Icon v-if="child.icon" :name="child.icon" class="mr-2 h-4 w-4" />
                <span>{{ child.label }}</span>
              </DropdownMenuItem>
            </template>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem
          v-else :class="cn(action.variant === 'destructive' && 'text-destructive')"
          :disabled="resolveBoolean(action.disabled, false)" @click="action.onClick?.(row.original)"
        >
          <Icon v-if="action.icon" :name="action.icon" class="mr-2 h-4 w-4" />
          <span>{{ action.label }}</span>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
