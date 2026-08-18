<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const { apiKeys } = useMockData()

function statusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    revoked: 'text-destructive bg-destructive/10 ring-destructive/20',
    expired: 'text-muted-foreground bg-muted ring-border',
  }
  return colors[status] || 'text-muted-foreground bg-muted'
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = { active: 'Active', revoked: 'Révoquée', expired: 'Expirée' }
  return labels[status] || status
}

const showSecret = ref<Record<string, boolean>>({})
const showConfirmRevoke = ref(false)
const revokeTarget = ref<string | null>(null)

function toggleSecret(keyId: string) {
  showSecret.value[keyId] = !showSecret.value[keyId]
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Clés API</h1>
        <p class="text-sm text-muted-foreground mt-1">Gérez vos clés d'accès à l'API</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Générer une clé
      </button>
    </div>

    <Card>
      <CardContent class="p-0">
        <div class="divide-y divide-border">
          <div v-for="key in apiKeys" :key="key.id" class="p-5 space-y-3">
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-foreground">{{ key.name }}</h3>
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', statusColor(key.status)]">
                    {{ statusLabel(key.status) }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground">Client ID: {{ key.clientId }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="h-8 px-3 rounded-lg border border-border text-xs font-medium hover:bg-accent transition-all"
                  @click="toggleSecret(key.id)"
                >
                  {{ showSecret[key.id] ? 'Masquer' : 'Afficher' }} le secret
                </button>
                <button
                  v-if="key.status === 'active'"
                  class="h-8 px-3 rounded-lg border border-destructive/30 text-xs font-medium text-destructive hover:bg-destructive/10 transition-all"
                  @click="revokeTarget = key.id; showConfirmRevoke = true"
                >
                  Révoquer
                </button>
              </div>
            </div>
            <div class="bg-muted rounded-lg p-3">
              <div class="text-[10px] font-medium text-muted-foreground mb-1">Secret</div>
              <code class="text-sm font-mono">
                {{ showSecret[key.id] ? key.secret : '••••••••••••••••••••••••••••••••' }}
              </code>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="perm in key.permissions"
                :key="perm"
                class="inline-flex items-center rounded bg-primary/5 border border-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                {{ perm }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Créée le {{ key.createdAt }}</span>
              <span>Expire le {{ key.expiresAt }}</span>
              <span v-if="key.lastUsedAt">Dernière utilisation: {{ new Date(key.lastUsedAt).toLocaleDateString('fr-FR') }}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <AlertDialog v-model:open="showConfirmRevoke">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Révoquer cette clé ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. La clé ne pourra plus être utilisée pour authentifier les requêtes API.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="revokeTarget = null">Annuler</AlertDialogCancel>
          <AlertDialogAction variant="destructive" @click="showConfirmRevoke = false">Révoquer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
