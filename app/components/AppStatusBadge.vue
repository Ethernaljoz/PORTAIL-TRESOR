<script setup lang="ts">
interface Props {
  status: string
  variant?: 'default' | 'dot'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const colorMap: Record<string, string> = {
  'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'Active': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'Reussi': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'Execute': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'Approuve': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'active': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
  'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
  'pending': 'text-amber-600 bg-amber-50 ring-amber-200',
  'Inactif': 'text-muted-foreground bg-muted ring-border',
  'inactive': 'text-muted-foreground bg-muted ring-border',
  'Expiré': 'text-muted-foreground bg-muted ring-border',
  'expired': 'text-muted-foreground bg-muted ring-border',
  'Revoquee': 'text-muted-foreground bg-muted ring-border',
  'revoked': 'text-muted-foreground bg-muted ring-border',
  'Rejete': 'text-destructive bg-destructive/10 ring-destructive/20',
  'Rejeté': 'text-destructive bg-destructive/10 ring-destructive/20',
  'Echoue': 'text-destructive bg-destructive/10 ring-destructive/20',
  'Échoué': 'text-destructive bg-destructive/10 ring-destructive/20',
  'Annule': 'text-destructive bg-destructive/10 ring-destructive/20',
  'Annulé': 'text-destructive bg-destructive/10 ring-destructive/20',
  'error': 'text-destructive bg-destructive/10 ring-destructive/20',
}

const dotColorMap: Record<string, string> = {
  'Actif': 'bg-emerald-500',
  'Active': 'bg-emerald-500',
  'Reussi': 'bg-emerald-500',
  'Execute': 'bg-emerald-500',
  'Approuve': 'bg-emerald-500',
  'active': 'bg-emerald-500',
  'En attente': 'bg-amber-500',
  'pending': 'bg-amber-500',
  'Inactif': 'bg-muted-foreground',
  'inactive': 'bg-muted-foreground',
  'Expiré': 'bg-muted-foreground',
  'expired': 'bg-muted-foreground',
  'Rejete': 'bg-red-500',
  'Rejeté': 'bg-red-500',
  'Echoue': 'bg-red-500',
  'Échoué': 'bg-red-500',
  'error': 'bg-red-500',
}

const badgeClass = computed(() => colorMap[props.status] || 'text-muted-foreground bg-muted ring-border')
const dotClass = computed(() => dotColorMap[props.status] || 'bg-muted-foreground')
</script>

<template>
  <span v-if="variant === 'dot'" class="inline-flex items-center gap-1.5 text-[11px] font-medium">
    <span :class="['size-2 rounded-full shrink-0', dotClass]" />
    {{ status }}
  </span>
  <span v-else :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', badgeClass]">
    {{ status }}
  </span>
</template>
