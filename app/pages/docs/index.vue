<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary mb-4">
        API v1.0
      </div>
      <h1 class="text-3xl font-bold text-foreground">Introduction à Portail Trésor</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Bienvenue dans la documentation de Portail Trésor. Cette API RESTful vous permet d'intégrer les services financiers du Trésor dans vos applications.
      </p>
    </div>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Vue d'ensemble</h2>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Portail Trésor expose un ensemble d'endpoints RESTful pour la gestion de comptes, le transfert de fonds, et le suivi des opérations financières. Toutes les requêtes et réponses sont au format JSON.
        </p>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">URL de base (Sandbox)</div>
          <code class="text-sm font-mono text-foreground">https://sandbox-api.tresor.bf/v1</code>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">URL de base (Production)</div>
          <code class="text-sm font-mono text-foreground">https://api.tresor.bf/v1</code>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Authentication</h2>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Toutes les requêtes API nécessitent un token d'accès Bearer. Obtenez votre token via l'endpoint <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">POST /v1/auth/token</code> en utilisant votre <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">client_id</code> et <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">client_secret</code>.
        </p>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Exemple d'en-tête</div>
          <code class="text-sm font-mono text-foreground block">Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</code>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Rate Limiting</h2>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Les requêtes sont limitées à <strong>1000 requêtes par minute</strong> par clé API en mode sandbox, et <strong>10 000 requêtes par minute</strong> en production. Les en-têtes de réponse indiquent votre quota restant.
        </p>
        <div class="bg-muted rounded-lg p-4 space-y-1">
          <code class="text-xs font-mono text-foreground block">X-RateLimit-Limit: 1000</code>
          <code class="text-xs font-mono text-foreground block">X-RateLimit-Remaining: 847</code>
          <code class="text-xs font-mono text-foreground block">X-RateLimit-Reset: 1692364800</code>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
