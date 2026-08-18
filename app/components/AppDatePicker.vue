<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date'
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  min?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Choisir une date',
  min: '',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const df = new DateFormatter('fr-FR', { dateStyle: 'medium' })

const dateValue = ref<CalendarDate | undefined>(
  props.modelValue ? parseDate(props.modelValue) : undefined,
)

watch(() => props.modelValue, (val) => {
  dateValue.value = val ? parseDate(val) : undefined
})

watch(dateValue, (val) => {
  emit('update:modelValue', val ? val.toString() : '')
})

function isDisabled(date: DateValue): boolean {
  if (!props.min)
    return false
  const minDate = parseDate(props.min)
  if (date instanceof CalendarDate) {
    return date.compare(minDate) < 0
  }
  return false
}

const displayValue = computed(() => {
  if (!dateValue.value)
    return ''
  return df.format(dateValue.value.toDate(getLocalTimeZone()))
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="min-w-[160px] justify-start text-left font-normal"
        :class="!dateValue && 'text-muted-foreground'"
      >
        <Icon name="i-lucide-calendar" class="mr-2 size-4 shrink-0" />
        {{ displayValue || placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar v-model="dateValue" :disabled-dates="isDisabled" initial-focus />
    </PopoverContent>
  </Popover>
</template>
