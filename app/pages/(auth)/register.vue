<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const { login } = useAuth()
const isLoading = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  isLoading.value = true
  try {
    await login({ email: email.value || 'dev@tresor.bf', password: password.value || 'mock' })
    await navigateTo('/dashboard')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/30 px-4">
    <Card class="w-full max-w-md">
      <CardContent class="p-8 space-y-6">
        <div class="text-center space-y-2">
          <div class="size-12 rounded-xl bg-primary mx-auto flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <h1 class="text-xl font-semibold text-foreground">Créer un compte</h1>
          <p class="text-sm text-muted-foreground">Commencez à tester l'API en sandbox</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Nom complet</label>
            <input
              v-model="name"
              type="text"
              placeholder="Jean Dupont"
              class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="jean@entreprise.com"
              class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="h-10 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {{ isLoading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="text-center text-sm text-muted-foreground">
          Déjà un compte ?
          <NuxtLink to="/login" class="text-primary font-medium hover:underline">
            Se connecter
          </NuxtLink>
        </div>

        <div class="bg-muted/50 rounded-lg p-3 text-center">
          <p class="text-xs text-muted-foreground">
            Mode démo : l'inscription est simulée et redirige vers le dashboard.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
