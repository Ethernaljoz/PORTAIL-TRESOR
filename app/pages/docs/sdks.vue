<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const sdks = [
  {
    name: 'JavaScript / Node.js',
    icon: 'i-lucide-code',
    install: 'npm install @tresor/sdk',
    example: `import { TresorClient } from '@tresor/sdk'

const client = new TresorClient({
  clientId: 'client_a1b2c3d4e5f6',
  clientSecret: 'sk_live_xxx...',
  environment: 'sandbox'
})

const comptes = await client.comptes.list()
console.log(comptes.data)`,
  },
  {
    name: 'Python',
    icon: 'i-lucide-code',
    install: 'pip install tresor-sdk',
    example: `from tresor import TresorClient

client = TresorClient(
    client_id="client_a1b2c3d4e5f6",
    client_secret="sk_live_xxx...",
    environment="sandbox"
)

comptes = client.comptes.list()
print(comptes.data)`,
  },
  {
    name: 'cURL',
    icon: 'i-lucide-terminal',
    install: '(commande native)',
    example: `# Obtenir un token
curl -X POST https://sandbox-api.tresor.bf/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id":"client_xxx","client_secret":"sk_xxx...","grant_type":"client_credentials"}'

# Lister les comptes
curl -X GET https://sandbox-api.tresor.bf/v1/comptes \\
  -H "Authorization: Bearer <token>"`,
  },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">SDKs & Exemples</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Utilisez nos SDKs officiels ou intégrez l'API directement avec vos outils préférés.
      </p>
    </div>

    <Card v-for="sdk in sdks" :key="sdk.name">
      <CardContent class="p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon :name="sdk.icon" class="size-5 text-primary" />
          </div>
          <h2 class="text-lg font-semibold text-foreground">{{ sdk.name }}</h2>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Installation</div>
          <code class="text-sm font-mono text-foreground">{{ sdk.install }}</code>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-[11px] font-semibold text-muted-foreground mb-2">Exemple d'utilisation</div>
          <pre class="text-sm font-mono text-foreground overflow-x-auto"><code>{{ sdk.example }}</code></pre>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
