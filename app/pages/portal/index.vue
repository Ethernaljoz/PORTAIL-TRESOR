<script setup lang="ts">
definePageMeta({
  layout: 'portal',
})

const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Ultra rapide',
    description: 'Latence moyenne de 142ms. Conçu pour des réponses en temps réel.',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Sécurisé',
    description: 'Authentification OAuth 2.0, chiffrement TLS 1.3, conformité PCI-DSS.',
  },
  {
    icon: 'i-lucide-code',
    title: 'RESTful & documenté',
    description: 'API REST complète avec documentation OpenAPI, SDKs et exemples de code.',
  },
  {
    icon: 'i-lucide-activity',
    title: 'Monitoring temps réel',
    description: 'Tableau de bord avec métriques, logs d\'activité et alertes personnalisables.',
  },
  {
    icon: 'i-lucide-webhook',
    title: 'Webhooks',
    description: 'Recevez des notifications push sur les événements critiques de vos transactions.',
  },
  {
    icon: 'i-lucide-puzzle',
    title: 'Intégration facile',
    description: 'SDKs pour Python, Node.js, Java et PHP. Intégration en quelques minutes.',
  },
]

const steps = [
  { number: '01', title: 'Créez votre compte', description: 'Inscrivez-vous en quelques secondes pour accéder au sandbox.' },
  { number: '02', title: 'Générez vos clés API', description: 'Obtenez votre client_id et client_secret pour l\'authentification.' },
  { number: '03', title: 'Testez en sandbox', description: 'Expérimentez l\'API avec des données de test sans risque.' },
  { number: '04', title: 'Passez en production', description: 'Passez en mode production avec vos clés de production.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
          <span class="size-1.5 rounded-full bg-primary animate-pulse" />
          Sandbox disponible
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
          L'API pour intégrer les services financiers du
          <span class="text-primary">Trésor</span>
        </h1>
        <p class="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Consultez les soldes, initiez des transferts et suivez vos opérations
          via une API RESTful sécurisée et documentée.
        </p>
        <div class="mt-10 flex items-center justify-center gap-4">
          <NuxtLink
            to="/register"
            class="h-12 px-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2"
          >
            Commencer gratuitement
            <Icon name="i-lucide-arrow-right" class="size-4" />
          </NuxtLink>
          <NuxtLink
            to="/docs"
            class="h-12 px-8 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-all inline-flex items-center gap-2"
          >
            Voir la documentation
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
    <section class="border-y border-border bg-muted/30">
      <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground">99.9%</div>
          <div class="text-sm text-muted-foreground mt-1">Uptime</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground">142ms</div>
          <div class="text-sm text-muted-foreground mt-1">Latence moyenne</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground">145K+</div>
          <div class="text-sm text-muted-foreground mt-1">Requêtes / mois</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-foreground">7</div>
          <div class="text-sm text-muted-foreground mt-1">Endpoints disponibles</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-6 py-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-foreground">Tout ce dont vous avez besoin</h2>
        <p class="mt-4 text-muted-foreground max-w-xl mx-auto">
          Une plateforme complète pour développer, tester et déployer vos intégrations.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all"
        >
          <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon :name="feature.icon" class="size-5 text-primary" />
          </div>
          <h3 class="font-semibold text-foreground">{{ feature.title }}</h3>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="border-y border-border bg-muted/30">
      <div class="max-w-7xl mx-auto px-6 py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-foreground">Comment démarrer</h2>
          <p class="mt-4 text-muted-foreground">Quatre étapes pour intégrer l'API.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="step in steps" :key="step.number" class="text-center">
            <div class="text-4xl font-bold text-primary/20 mb-4">{{ step.number }}</div>
            <h3 class="font-semibold text-foreground">{{ step.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 class="text-3xl font-bold text-foreground">Prêt à construire ?</h2>
      <p class="mt-4 text-muted-foreground max-w-xl mx-auto">
        Créez un compte gratuit et commencez à tester l'API en sandbox dès maintenant.
      </p>
      <div class="mt-8">
        <NuxtLink
          to="/register"
          class="h-12 px-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2"
        >
          Créer un compte gratuit
          <Icon name="i-lucide-arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
