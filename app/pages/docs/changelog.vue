<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const changes = [
  {
    version: '1.0.0',
    date: '2026-08-01',
    type: 'minor',
    changes: [
      'Lancement de la plateforme TRésor API',
      'Endpoints : Comptes, Transferts, Opérations, Webhooks, Auth',
      'SDKs JavaScript et Python',
      'Mode Sandbox disponible',
    ],
  },
  {
    version: '0.9.0',
    date: '2026-06-15',
    type: 'minor',
    changes: [
      'Phase beta fermée',
      'Ajout de l\'endpoint Webhooks',
      'Amélioration de la documentation',
    ],
  },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Changelog</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Historique des versions et changements de TRésor API.
      </p>
    </div>

    <div class="space-y-6">
      <Card v-for="release in changes" :key="release.version">
        <CardContent class="p-6 space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-lg font-bold text-foreground">v{{ release.version }}</span>
            <span class="text-xs text-muted-foreground">{{ release.date }}</span>
          </div>
          <ul class="space-y-2">
            <li v-for="(change, i) in release.changes" :key="i" class="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="i-lucide-check-circle" class="size-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{{ change }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
