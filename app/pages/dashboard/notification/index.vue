<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { notifications } = useMockData()

const typeFilter = ref('')
const showUnreadOnly = ref(false)

const filteredNotifications = computed(() => {
  return notifications.value.filter(n => {
    if (typeFilter.value && n.type !== typeFilter.value) return false
    if (showUnreadOnly.value && n.lue) return false
    return true
  })
})

function notifIcon(type: string): string {
  const map: Record<string, string> = {
    info: 'i-lucide-info',
    success: 'i-lucide-check-circle',
    warning: 'i-lucide-alert-triangle',
    error: 'i-lucide-x-circle',
  }
  return map[type] || 'i-lucide-bell'
}

function notifColor(type: string): string {
  const map: Record<string, string> = {
    info: 'text-blue-600 bg-blue-50',
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    error: 'text-destructive bg-destructive/10',
  }
  return map[type] || 'text-muted-foreground bg-muted'
}

const unreadCount = computed(() => notifications.value.filter(n => !n.lue).length)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Notifications</h1>
        <p class="text-sm text-muted-foreground mt-1">Centre de notifications de la plateforme</p>
      </div>
      <button class="h-9 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-all">
        Tout marquer comme lu
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Total</div>
          <div class="text-2xl font-bold mt-1">{{ notifications.length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Non lues</div>
          <div class="text-2xl font-bold mt-1 text-primary">{{ unreadCount }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Alertes</div>
          <div class="text-2xl font-bold mt-1 text-amber-600">{{ notifications.filter(n => n.type === 'warning').length }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-5">
          <div class="text-[12px] text-muted-foreground font-medium">Erreurs</div>
          <div class="text-2xl font-bold mt-1 text-destructive">{{ notifications.filter(n => n.type === 'error').length }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Type</label>
            <select v-model="typeFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">Tous</option>
              <option value="info">Info</option>
              <option value="success">Succes</option>
              <option value="warning">Alerte</option>
              <option value="error">Erreur</option>
            </select>
          </div>
          <div class="flex items-center gap-2 h-9">
            <input id="unreadOnly" v-model="showUnreadOnly" type="checkbox" class="rounded border-border">
            <label for="unreadOnly" class="text-sm">Non lues uniquement</label>
          </div>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredNotifications.length }} notification(s)
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Liste -->
    <div class="space-y-2">
      <Card v-for="notif in filteredNotifications" :key="notif.id" :class="{ 'opacity-60': notif.lue }">
        <CardContent class="p-4">
          <div class="flex items-start gap-4">
            <div :class="['size-10 rounded-lg flex items-center justify-center shrink-0', notifColor(notif.type)]">
              <Icon :name="notifIcon(notif.type)" class="size-5" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold">{{ notif.titre }}</h3>
                <span v-if="!notif.lue" class="size-2 rounded-full bg-primary shrink-0" />
              </div>
              <p class="text-xs text-muted-foreground mt-1">{{ notif.message }}</p>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-[11px] text-muted-foreground">{{ notif.source }}</span>
                <span class="text-[11px] text-muted-foreground">|</span>
                <span class="text-[11px] text-muted-foreground">{{ notif.destinataire }}</span>
                <span class="text-[11px] text-muted-foreground">|</span>
                <span class="text-[11px] text-muted-foreground">{{ notif.date }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
