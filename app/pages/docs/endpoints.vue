<script setup lang="ts">
import { MOCK_ENDPOINTS } from '~/constants/mock-data'

definePageMeta({
  layout: 'docs',
})

const endpoints = MOCK_ENDPOINTS

function methodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: 'text-emerald-600 bg-emerald-50',
    POST: 'text-blue-600 bg-blue-50',
    PUT: 'text-amber-600 bg-amber-50',
    DELETE: 'text-destructive bg-destructive/10',
    PATCH: 'text-purple-600 bg-purple-50',
  }
  return colors[method] || 'text-muted-foreground bg-muted'
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Endpoints</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Liste complète des endpoints disponibles dans l'API TRésor v1.
      </p>
    </div>

    <div v-for="endpoint in endpoints" :key="endpoint.id" class="space-y-4">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <span :class="['inline-flex items-center rounded px-2 py-1 text-xs font-bold font-mono', methodColor(endpoint.method)]">
              {{ endpoint.method }}
            </span>
            <code class="text-sm font-mono text-foreground font-semibold">{{ endpoint.path }}</code>
          </div>
          <h3 class="text-lg font-semibold text-foreground">{{ endpoint.title }}</h3>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">{{ endpoint.description }}</p>

          <!-- Parameters -->
          <div v-if="endpoint.parameters.length > 0" class="mt-6">
            <h4 class="text-sm font-semibold text-foreground mb-3">Paramètres</h4>
            <div class="border border-border rounded-lg overflow-hidden">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-muted/50 border-b border-border">
                    <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Nom</th>
                    <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Type</th>
                    <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Requis</th>
                    <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr v-for="param in endpoint.parameters" :key="param.name" class="hover:bg-muted/30">
                    <td class="py-2 px-4 font-mono text-xs">{{ param.name }}</td>
                    <td class="py-2 px-4 text-xs text-muted-foreground">{{ param.type }}</td>
                    <td class="py-2 px-4">
                      <span v-if="param.required" class="text-[10px] font-medium text-destructive">Requis</span>
                      <span v-else class="text-[10px] text-muted-foreground">Optionnel</span>
                    </td>
                    <td class="py-2 px-4 text-xs text-muted-foreground">{{ param.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Request Body -->
          <div v-if="endpoint.requestBody" class="mt-6">
            <h4 class="text-sm font-semibold text-foreground mb-3">Corps de la requête</h4>
            <div class="bg-muted rounded-lg p-4">
              <div class="text-[11px] font-semibold text-muted-foreground mb-2">Exemple</div>
              <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>{{ endpoint.requestBody.example }}</code></pre>
            </div>
          </div>

          <!-- Response -->
          <div class="mt-6">
            <h4 class="text-sm font-semibold text-foreground mb-3">Réponse ({{ endpoint.statusCode }})</h4>
            <div class="bg-muted rounded-lg p-4">
              <div class="text-[11px] font-semibold text-muted-foreground mb-2">Exemple</div>
              <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>{{ endpoint.responseExample }}</code></pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
