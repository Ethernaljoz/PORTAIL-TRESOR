<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
  options: { label: string, value: string }[]
  placeholder?: string
  label?: string
  triggerClass?: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : ''
})

function select(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="containerRef" class="space-y-1.5 relative">
    <label v-if="label" class="text-[12px] font-medium text-muted-foreground">{{ label }}</label>
    <button
      type="button"
      :class="[
        'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none',
        'hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        isOpen && 'border-ring ring-ring/50 ring-[3px]',
        triggerClass,
      ]"
      @click="isOpen = !isOpen"
    >
      <span :class="['truncate', !selectedLabel && 'text-muted-foreground']">
        {{ selectedLabel || placeholder || 'Selectionner...' }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-50">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md"
      >
        <div class="p-1">
          <button
            v-for="opt in options"
            :key="opt.value"
            type="button"
            :class="[
              'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground',
              modelValue === opt.value && 'bg-accent text-accent-foreground font-medium',
            ]"
            @click="select(opt.value)"
          >
            <svg v-if="modelValue === opt.value" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-2 shrink-0">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {{ opt.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
