<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <LayoutPortalHeader />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-border bg-muted/30">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="size-8 rounded-lg bg-primary flex items-center justify-center">
                <span class="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span class="font-semibold text-foreground">TRésor API</span>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed">
              Plateforme développeur pour intégrer les services financiers du Trésor.
            </p>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">Produit</h4>
            <div class="space-y-2 text-sm text-muted-foreground">
              <NuxtLink to="/docs" class="block hover:text-foreground transition-colors">Documentation</NuxtLink>
              <NuxtLink to="/portal#pricing" class="block hover:text-foreground transition-colors">Tarifs</NuxtLink>
              <NuxtLink to="/dashboard" class="block hover:text-foreground transition-colors">Espace développeur</NuxtLink>
            </div>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">Ressources</h4>
            <div class="space-y-2 text-sm text-muted-foreground">
              <NuxtLink to="/docs" class="block hover:text-foreground transition-colors">API Reference</NuxtLink>
              <span class="block">Changelog</span>
              <span class="block">Status</span>
            </div>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">Légal</h4>
            <div class="space-y-2 text-sm text-muted-foreground">
              <span class="block">Conditions d'utilisation</span>
              <span class="block">Politique de confidentialité</span>
            </div>
          </div>
        </div>
        <div class="mt-10 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>&copy; 2026 TRésor API. Tous droits réservés.</span>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  </div>
</template>
