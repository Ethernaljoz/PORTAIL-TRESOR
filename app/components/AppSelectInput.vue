<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: { label: string, value: string }[]
  placeholder?: string
  label?: string
  triggerClass?: string
  contentClass?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" class="text-[12px] font-medium text-muted-foreground">{{ label }}</label>
    <Select :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
      <SelectTrigger class="min-w-50" :class="[triggerClass]">
        <SelectValue :placeholder="placeholder || 'Sélectionner...'" />
      </SelectTrigger>
      <SelectContent :class="contentClass">
        <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
