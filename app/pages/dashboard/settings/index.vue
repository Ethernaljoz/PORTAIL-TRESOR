<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})

const { user } = useAuth()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold">Paramètres</h1>
      <p class="text-sm text-muted-foreground mt-1">Configurez votre profil développeur</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="text-base">Profil</CardTitle>
        <CardDescription>Informations de votre compte développeur</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Nom</label>
            <input
              :value="user?.name"
              type="text"
              disabled
              class="h-9 w-full rounded-lg border border-border bg-muted px-3 text-sm"
            >
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Email</label>
            <input
              :value="user?.email"
              type="email"
              disabled
              class="h-9 w-full rounded-lg border border-border bg-muted px-3 text-sm"
            >
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-base">Notifications</CardTitle>
        <CardDescription>Paramètres de notification par email</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between py-2 border-b border-border">
          <div>
            <div class="text-sm font-medium">Alertes d'erreurs</div>
            <div class="text-xs text-muted-foreground">Recevoir un email en cas d'erreur 5xx</div>
          </div>
          <div class="size-5 rounded border border-primary bg-primary flex items-center justify-center">
            <Icon name="i-lucide-check" class="size-3 text-primary-foreground" />
          </div>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-border">
          <div>
            <div class="text-sm font-medium">Résumé hebdomadaire</div>
            <div class="text-xs text-muted-foreground">Recevoir un rapport chaque lundi</div>
          </div>
          <div class="size-5 rounded border border-primary bg-primary flex items-center justify-center">
            <Icon name="i-lucide-check" class="size-3 text-primary-foreground" />
          </div>
        </div>
        <div class="flex items-center justify-between py-2">
          <div>
            <div class="text-sm font-medium">Mises à jour de la plateforme</div>
            <div class="text-xs text-muted-foreground">Nouvelles fonctionnalités et changements d'API</div>
          </div>
          <div class="size-5 rounded border border-border bg-background" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-base">Sécurité</CardTitle>
        <CardDescription>Gestion de votre mot de passe</CardDescription>
      </CardHeader>
      <CardContent>
        <button class="h-9 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-all">
          Changer le mot de passe
        </button>
      </CardContent>
    </Card>
  </div>
</template>
