<script setup lang="ts">
interface DetailRowProps {
  label: string
  value?: string | number | null
}

const { label, value } = defineProps<DetailRowProps>()
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <span class="text-xs text-muted-foreground">{{ label }}</span>
    <span class="text-sm font-medium">{{ value }}</span>
  </div>
</template>
