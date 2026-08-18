<script setup lang="ts">
const props = defineProps<{
  series: { name: string, data: number[] }[]
  loading?: boolean
}>()

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

const maxValue = computed(() => {
  let max = 0
  for (const s of props.series) {
    for (const d of s.data) {
      if (d > max)
        max = d
    }
  }
  return max || 1
})

function barHeight(value: number): string {
  return `${(value / maxValue.value) * 100}%`
}

function formatAmount(val: number): string {
  return val.toLocaleString('fr-FR')
}
</script>

<template>
  <div v-if="!loading && series.length > 0">
    <div class="flex items-end gap-1 h-48 px-2">
      <div v-for="(month, i) in months" :key="i" class="flex-1 h-full flex flex-col justify-end items-center gap-0.5">
        <div
          v-for="(s, si) in series"
          :key="si"
          class="w-full rounded-t transition-all duration-500"
          :style="{ height: barHeight(s.data[i] || 0), backgroundColor: si === 0 ? 'var(--primary)' : 'var(--primary)/60' }"
          :title="`${month}: ${formatAmount(s.data[i] || 0)}`"
        />
      </div>
    </div>
    <div class="flex justify-between mt-2 px-2">
      <span v-for="m in months" :key="m" class="text-[10px] text-muted-foreground">{{ m }}</span>
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
