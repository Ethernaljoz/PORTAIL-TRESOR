

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative flex-1 max-w-xs">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    <input
      :value="modelValue"
      type="text"
      placeholder="Rechercher..."
      class="field-input pl-9"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
