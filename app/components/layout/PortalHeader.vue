<script setup lang="ts">
import { portalNav } from '~/constants/menus'

const { isAuthenticated } = useAuth()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <NuxtLink to="/portal" class="flex items-center gap-2.5">
          <div class="size-9 rounded-lg bg-primary flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-base">T</span>
          </div>
          <span class="font-semibold text-foreground text-base">TRésor API</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in portalNav"
            :key="item.link"
            :to="item.link"
            class="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center gap-3">
        <ClientOnly>
          <template v-if="isAuthenticated">
            <NuxtLink
              to="/dashboard"
              class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              Mon tableau de bord
            </NuxtLink>
          </template>
          <template #fallback>
            <NuxtLink
              to="/login"
              class="h-9 px-4 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              Connexion
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              Créer un compte
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
