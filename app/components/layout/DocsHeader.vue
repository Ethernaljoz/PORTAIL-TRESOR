<script setup lang="ts">
const emit = defineEmits<{
  toggleSidebar: []
}>()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          class="lg:hidden size-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          @click="emit('toggleSidebar')"
        >
          <Icon name="i-lucide-menu" class="size-4" />
        </button>
        <NuxtLink to="/portal" class="flex items-center gap-2.5">
          <div class="size-8 rounded-sm bg-primary flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-sm">PT</span>
          </div>
          <span class="font-semibold text-foreground text-sm">Portail Trésor</span>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-border">
          <NuxtLink
            to="/docs"
            class="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Documentation
          </NuxtLink>
          <NuxtLink
            to="/dashboard"
            class="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Dashboard
          </NuxtLink>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <Icon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            class="h-9 w-48 pl-9 pr-3 rounded-lg border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
          >
        </div>
      </div>
    </div>
  </header>
</template>
