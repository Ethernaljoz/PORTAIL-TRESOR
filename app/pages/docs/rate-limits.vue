<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Limites de débit</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Les limites de débit protègent la plateforme contre les abus et garantissent la disponibilité du service pour tous les développeurs.
      </p>
    </div>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Quotas par environnement</h2>
        <div class="border border-border rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-muted/50 border-b border-border">
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Environnement</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Requêtes / minute</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Requêtes / jour</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr class="hover:bg-muted/30">
                <td class="py-2 px-4">
                  <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset text-amber-600 bg-amber-50 ring-amber-200">Sandbox</span>
                </td>
                <td class="py-2 px-4 text-sm">1 000</td>
                <td class="py-2 px-4 text-sm">50 000</td>
              </tr>
              <tr class="hover:bg-muted/30">
                <td class="py-2 px-4">
                  <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset text-emerald-600 bg-emerald-50 ring-emerald-200">Production</span>
                </td>
                <td class="py-2 px-4 text-sm">10 000</td>
                <td class="py-2 px-4 text-sm">1 000 000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">En-têtes de réponse</h2>
        <p class="text-sm text-muted-foreground">
          Chaque réponse API inclut les en-têtes suivants pour le suivi de votre consommation :
        </p>
        <div class="bg-muted rounded-lg p-4">
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1692364800</code></pre>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Dépassement de quota</h2>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Si vous dépassez la limite, l'API retournera une réponse <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">429 Too Many Requests</code> avec un en-tête <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Retry-After</code> indiquant le délai d'attente recommandé en secondes.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
