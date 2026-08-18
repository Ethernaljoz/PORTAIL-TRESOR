<script setup lang="ts">
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'

const { login, isLoggingIn } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)
const errors = ref<Record<string, string[]>>({})

async function onSubmit(event: Event) {
  event.preventDefault()
  errors.value = {}

  if (!email.value || !password.value) {
    errors.value = { email: ['Veuillez remplir tous les champs'] }
    return
  }

  try {
    await login({ email: email.value, password: password.value })
  }
  catch (err: any) {
    if (err?.response?.data?.errors) {
      errors.value = err.response.data.errors
    }
  }
}
</script>

<template>
  <div class="w-full max-w-sm">
    <!-- Mobile logo -->
    <div class="flex lg:hidden items-center gap-3 mb-10">
      <img src="/img/logo-cnhu.png" alt="CNHU-HKM" class="size-10 rounded-xl shadow-[var(--shadow-glow)]">
      <div>
        <div class="text-[15px] font-semibold text-foreground leading-tight">
          CNHU-HKM
        </div>
        <div class="text-[11px] text-muted-foreground">
          Espace administrateur
        </div>
      </div>
    </div>

    <!-- Desktop logo + title -->
    <div class="flex flex-col items-center text-center mb-10">
      <img
        src="/img/logo-cnhu.png"
        alt="CNHU-HKM"
        class="size-20 rounded-2xl shadow-[var(--shadow-glow)] mb-5"
      >
      <h1 class="text-[24px] font-bold text-foreground">
        Connexion
      </h1>
      <p class="text-[13px] text-muted-foreground mt-1.5">
        Accédez à votre espace d'administration.
      </p>
    </div>

    <form class="space-y-5" @submit="onSubmit">
      <label class="block">
        <span class="text-[12px] font-medium text-muted-foreground mb-1.5 block">Adresse email</span>
        <input
          v-model="email"
          type="email"
          class="field-input"
          :class="{ 'border-destructive': errors.email }"
          placeholder="vous@exemple.com"
          :disabled="isLoggingIn"
          autocomplete="email"
        >
        <p v-if="errors.email" class="text-sm text-destructive mt-1">
          {{ errors.email[0] }}
        </p>
      </label>

      <label class="block">
        <span class="text-[12px] font-medium text-muted-foreground mb-1.5 block">Mot de passe</span>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="field-input"
            :class="{ 'border-destructive': errors.password }"
            placeholder="••••••••"
            :disabled="isLoggingIn"
            autocomplete="current-password"
          >
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            @click="showPassword = !showPassword"
          >
            <Eye v-if="!showPassword" class="size-4" />
            <EyeOff v-else class="size-4" />
          </button>
        </div>
        <p v-if="errors.password" class="text-sm text-destructive mt-1">
          {{ errors.password[0] }}
        </p>
      </label>

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="remember"
            type="checkbox"
            class="size-4 rounded border-border text-primary focus:ring-primary"
          >
          <span class="text-[12px] text-muted-foreground">Se souvenir de moi</span>
        </label>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-[12px] font-medium text-primary hover:text-primary/80 transition"
        >
          Mot de passe oublié ?
        </NuxtLink>
      </div>

      <button
        type="submit"
        class="btn-primary w-full h-11 text-[14px]"
        :disabled="isLoggingIn"
      >
        <Loader2 v-if="isLoggingIn" class="size-4 animate-spin" />
        Se connecter
      </button>
    </form>

    <p class="mt-8 text-[11px] text-muted-foreground text-center leading-relaxed">
      Centre National Hospitalier et Universitaire<br>
      Hubert Koutoukou Maga — Cotonou, Bénin
    </p>
  </div>
</template>
