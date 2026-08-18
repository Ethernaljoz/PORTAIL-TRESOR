<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const errorCodes = [
  { code: 400, name: 'Bad Request', description: 'La requête est mal formée. Vérifiez le corps de la requête et les paramètres.' },
  { code: 401, name: 'Unauthorized', description: 'Token d\'accès manquant ou invalide. Vérifiez l\'en-tête Authorization.' },
  { code: 403, name: 'Forbidden', description: 'Vous n\'avez pas les droits nécessaires pour accéder à cette ressource.' },
  { code: 404, name: 'Not Found', description: 'La ressource demandée n\'existe pas.' },
  { code: 409, name: 'Conflict', description: 'Conflit avec l\'état actuel de la ressource (ex: doublon).' },
  { code: 422, name: 'Unprocessable Entity', description: 'Les données sont valides mais ne peuvent être traitées.' },
  { code: 429, name: 'Too Many Requests', description: 'Limite de débit dépassée. Réessayez après le délai indiqué.' },
  { code: 500, name: 'Internal Server Error', description: 'Erreur interne du serveur. Réessayez plus tard ou contactez le support.' },
]

function codeColor(code: number): string {
  if (code >= 400 && code < 500) return 'text-amber-600 bg-amber-50 ring-amber-200'
  return 'text-destructive bg-destructive/10 ring-destructive/20'
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Gestion des erreurs</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        L'API utilise les codes HTTP standards pour indiquer le résultat des requêtes. Les erreurs sont retournées au format JSON.
      </p>
    </div>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Format de réponse d'erreur</h2>
        <div class="bg-muted rounded-lg p-4">
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>{
  "status": "error",
  "error": {
    "code": 400,
    "message": "Le champ 'montant' est requis.",
    "details": {
      "field": "montant",
      "type": "missing_required"
    }
  }
}</code></pre>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Codes d'erreur</h2>
        <div class="border border-border rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-muted/50 border-b border-border">
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Code</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Nom</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="error in errorCodes" :key="error.code" class="hover:bg-muted/30">
                <td class="py-2 px-4">
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset', codeColor(error.code)]">
                    {{ error.code }}
                  </span>
                </td>
                <td class="py-2 px-4 font-medium text-xs">{{ error.name }}</td>
                <td class="py-2 px-4 text-xs text-muted-foreground">{{ error.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
