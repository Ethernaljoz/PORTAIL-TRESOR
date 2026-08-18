<script setup lang="ts">
import { CheckCircle, Plus, TrendingDown, TrendingUp, Wallet, XCircle } from 'lucide-vue-next'

interface DashboardStats {
  new: number
  validate: number
  canceled: number
  amount: number
  moov: number
  mtn: number
}

const props = defineProps<{
  stats: DashboardStats | null
  loading: boolean
}>()

function formatAmount(amount: number | null | undefined): string {
  if (amount == null)
    return '0'
  return amount.toLocaleString('fr-FR')
}

const cards = computed(() => [
  {
    label: 'Nouvelles consultations',
    value: props.stats?.new ?? 0,
    unit: '',
    trend: '+12%',
    positive: true,
    icon: Plus,
    tone: 'bg-primary/10 text-primary',
  },
  {
    label: 'Consultations validées',
    value: props.stats?.validate ?? 0,
    unit: '',
    trend: '+8%',
    positive: true,
    icon: CheckCircle,
    tone: 'bg-success/12 text-success',
  },
  {
    label: 'Consultations annulées',
    value: props.stats?.canceled ?? 0,
    unit: '',
    trend: '-3%',
    positive: false,
    icon: XCircle,
    tone: 'bg-destructive/10 text-destructive',
  },
  {
    label: 'Montant total collecté',
    value: formatAmount(props.stats?.amount),
    unit: 'Fcfa',
    trend: '+18%',
    positive: true,
    icon: Wallet,
    tone: 'bg-gradient-to-br from-primary/10 to-primary/5 text-primary',
    breakdown: [
      { label: 'MOOV', amount: props.stats?.moov ?? 0, color: 'text-cyan-600' },
      { label: 'MTN', amount: props.stats?.mtn ?? 0, color: 'text-yellow-600' },
    ],
  },
])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <div
      v-for="card in cards"
      :key="card.label"
      class="bg-card border border-border rounded-2xl p-5 shadow-(--shadow-soft) hover:shadow-(--shadow-elev) hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      <div class="flex items-start justify-between">
        <div class="size-11 rounded-xl flex items-center justify-center" :class="card.tone">
          <component :is="card.icon" class="size-5" />
        </div>
        <!-- <span
          class="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          :class="card.positive ? 'text-success bg-success/12' : 'text-destructive bg-destructive/10'"
        >
          <TrendingUp v-if="card.positive" class="size-3" />
          <TrendingDown v-else class="size-3" />
          {{ card.trend }}
        </span> -->
      </div>

      <div class="mt-5">
        <div class="text-[12px] text-muted-foreground">
          {{ card.label }}
        </div>
        <div class="mt-1 flex items-baseline gap-1.5">
          <span v-if="!loading" class="text-[26px] font-bold tracking-tight text-foreground">
            {{ card.value }}
          </span>
          <span v-else class="text-[26px] font-bold tracking-tight text-muted-foreground animate-pulse">
            --
          </span>
          <span v-if="card.unit" class="text-[12px] font-medium text-muted-foreground">
            {{ card.unit }}
          </span>
        </div>
        <div v-if="card.breakdown" class="mt-3 space-y-1.5 border-t border-border/50 pt-3">
          <div v-for="b in card.breakdown" :key="b.label" class="flex items-center justify-between text-[12px]">
            <span class="flex items-center gap-1.5 font-medium">
              <span class="size-2 rounded-full" :style="{ backgroundColor: b.label === 'MOOV' ? '#0891b2' : '#ca8a04' }" />
              {{ b.label }}
            </span>
            <span class="font-semibold" :class="b.color">
              {{ formatAmount(b.amount) }} Fcfa
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
