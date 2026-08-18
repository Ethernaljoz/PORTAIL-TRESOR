<script setup lang="ts">
const props = defineProps<{
  series: number[]
  labels: string[]
  loading?: boolean
}>()

const total = computed(() => props.series.reduce((a, b) => a + b, 0))

const colors = [
  '#003061',
  '#2563eb',
  '#059669',
  '#d97706',
  '#dc2626',
  '#7c3aed',
  '#0891b2',
  '#be185d',
  '#65a30d',
  '#0d9488',
]

const segments = computed(() => {
  let cumulative = 0
  return props.series.map((value, i) => {
    const startAngle = (cumulative / total.value) * 360
    cumulative += value
    const endAngle = (cumulative / total.value) * 360
    return {
      value,
      label: props.labels[i] || '',
      color: colors[i % colors.length],
      percentage: total.value > 0 ? ((value / total.value) * 100).toFixed(1) : '0',
      startAngle,
      endAngle,
      dashArray: `${endAngle - startAngle} ${360 - (endAngle - startAngle)}`,
      rotation: startAngle - 90,
    }
  })
})

function formatAmount(val: number): string {
  return val.toLocaleString('fr-FR')
}
</script>

<template>
  <div v-if="!loading && series.length > 0" class="flex flex-col items-center">
    <div class="relative w-48 h-48">
      <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
        <circle
          v-for="(seg, i) in segments"
          :key="i"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          :stroke="seg.color"
          stroke-width="14"
          stroke-dasharray="251.2"
          :stroke-dashoffset="251.2 - (seg.value / total) * 251.2"
          class="transition-all duration-700"
          style="transform-origin: center;"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-lg font-bold">{{ total.toLocaleString('fr-FR') }}</span>
      </div>
    </div>
    <div class="mt-4 space-y-1.5 w-full">
      <div v-for="(seg, i) in segments.slice(0, 5)" :key="i" class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: seg.color }" />
          <span class="text-muted-foreground truncate max-w-[140px]">{{ seg.label }}</span>
        </div>
        <span class="font-medium">{{ seg.percentage }}%</span>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="flex items-center justify-center h-48">
    <p class="text-muted-foreground text-sm">
      Chargement...
    </p>
  </div>
  <div v-else class="flex items-center justify-center h-48">
    <p class="text-muted-foreground text-sm">
      Aucune donnée
    </p>
  </div>
</template>
