<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Authentification</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        TRésor API utilise l'authentification OAuth 2.0 avec le flux Client Credentials. Vous devez fournir vos identifiants pour obtenir un token d'accès.
      </p>
    </div>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Étape 1 : Obtenir un token</h2>
        <p class="text-sm text-muted-foreground">
          Envoyez une requête POST à <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">/v1/auth/token</code> avec vos identifiants.
        </p>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Requête</div>
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>POST /v1/auth/token
Content-Type: application/json

{
  "client_id": "client_a1b2c3d4e5f6",
  "client_secret": "sk_live_xxx...",
  "grant_type": "client_credentials"
}</code></pre>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Réponse (200 OK)</div>
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}</code></pre>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Étape 2 : Utiliser le token</h2>
        <p class="text-sm text-muted-foreground">
          Incluez le token dans l'en-tête <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> de chaque requête API.
        </p>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Exemple avec cURL</div>
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>curl -X GET https://sandbox-api.tresor.bf/v1/comptes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json"</code></pre>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Expiration du token</h2>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Les tokens expirent après <strong>1 heure</strong> (3600 secondes). Lorsque le token expire, l'API retournera une erreur <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">401 Unauthorized</code>. Il vous faudra alors obtenir un nouveau token.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
