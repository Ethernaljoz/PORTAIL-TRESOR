<script setup lang="ts">
import { Button } from '@/components/ui/button'

// Services data
const services = [
  {
    icon: 'ri-tax-line',
    title: 'Paiement d\'impôts & taxes',
    description: 'Règlement instantané des impôts, taxes et droits de douane via la plateforme.',
    color: 'from-red-50 to-red-100 text-red-600',
  },
  {
    icon: 'ri-bank-line',
    title: 'Paiement des salaires & pensions',
    description: 'Gestion automatisée des paies et pensions des agents publics.',
    color: 'from-blue-50 to-blue-100 text-blue-600',
  },
  {
    icon: 'ri-building-line',
    title: 'Paiements fournisseurs B2B',
    description: 'Règlement sécurisé des marchés publics et fournisseurs de l\'État.',
    color: 'from-green-50 to-green-100 text-green-600',
  },
  {
    icon: 'ri-qr-code-line',
    title: 'Paiements par QR Code',
    description: 'Paiement mobile instantané via QR Code dans les guichets du Trésor.',
    color: 'from-purple-50 to-purple-100 text-purple-600',
  },
  {
    icon: 'ri-calendar-event-line',
    title: 'Paiements programmés',
    description: 'Planification et automatisation des paiements récurrents.',
    color: 'from-orange-50 to-orange-100 text-orange-600',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Sécurité & Conformité',
    description: 'Chiffrement AES-256, traçabilité complète et conformité LAB/FT.',
    color: 'from-teal-50 to-teal-100 text-teal-600',
  },
]

// Steps data
const steps = [
  {
    icon: 'ri-user-add-line',
    title: 'Inscription',
    description: 'Créez votre compte institutionnel sur la plateforme',
  },
  {
    icon: 'ri-check-double-line',
    title: 'Authentification',
    description: 'Connectez-vous avec vos identifiants sécurisés',
  },
  {
    icon: 'ri-send-plane-line',
    title: 'Transaction',
    description: 'Initiez et confirmez votre paiement en quelques clics',
  },
  {
    icon: 'ri-checkbox-circle-line',
    title: 'Confirmation',
    description: 'Recevez la confirmation en temps réel (< 10 secondes)',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 class="text-lg font-bold text-slate-900 leading-tight">
                Trésor Public
              </h1>
              <p class="text-xs text-slate-500 font-medium">
                Togo • PI-SPI
              </p>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-medium text-slate-600 hover:text-yellow-600 transition-colors">Accueil</a>
            <a href="#services" class="text-sm font-medium text-slate-600 hover:text-yellow-600 transition-colors">Services</a>
            <a href="#documentation" class="text-sm font-medium text-slate-600 hover:text-yellow-600 transition-colors">Documentation</a>
            <a href="#status" class="text-sm font-medium text-slate-600 hover:text-yellow-600 transition-colors">Statut</a>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <Button variant="ghost" size="sm" class="hidden sm:flex">
              <i class="ri-global-line mr-2" />
              FR
            </Button>
            <Button variant="outline" size="sm" class="hidden sm:inline-flex">
              Se connecter
            </Button>
            <Button size="sm" class="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-md hover:shadow-lg transition-all">
              <i class="ri-user-add-line mr-2" />
              S'inscrire
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-sm text-yellow-800 font-medium">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
              </span>
              PI-SPI • Transactions en < 10 secondes
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Modernisation des
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-800">
                Finances Publiques
              </span>
            </h1>

            <p class="text-lg text-slate-600 max-w-lg leading-relaxed">
              La plateforme interopérable du Trésor Public du Togo connectée au
              <span class="font-semibold text-slate-900">PI-SPI</span> de la BCEAO
              pour des paiements instantanés, sécurisés et transparents.
            </p>

            <div class="flex flex-wrap gap-4">
              <Button size="lg" class="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg hover:shadow-xl transition-all px-8">
                <i class="ri-rocket-line mr-2" />
                Commencer
              </Button>
              <Button size="lg" variant="outline" class="border-2 px-8">
                <i class="ri-file-text-line mr-2" />
                Documentation
              </Button>
            </div>

            <!-- Trust Indicators -->
            <div class="flex items-center gap-6 pt-4">
              <div class="flex -space-x-2">
                <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-white flex items-center justify-center text-xs font-bold text-yellow-800">
                  {{ ['D', 'G', 'T', 'P'][i - 1] }}
                </div>
              </div>
              <div>
                <div class="flex items-center gap-1">
                  <i v-for="star in 5" :key="star" class="ri-star-fill text-yellow-500 text-sm" />
                </div>
                <p class="text-xs text-slate-500">
                  +50 institutions connectées
                </p>
              </div>
            </div>
          </div>

          <!-- Hero Illustration -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative w-full max-w-lg">
              <!-- Main Card -->
              <div class="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                    <i class="ri-check-double-line text-green-600 text-2xl" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      Transaction instantanée
                    </p>
                    <p class="text-xs text-slate-500">
                      Reçue par le Trésor
                    </p>
                  </div>
                  <span class="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">✔ Réussie</span>
                </div>

                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Montant</span>
                    <span class="font-bold text-slate-900">2 450 000 FCFA</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Référence</span>
                    <span class="font-mono text-xs text-slate-600">TGO-2026-08-19-0042</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Service</span>
                    <span class="font-medium text-slate-900">Direction des Impôts</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-500">Temps de traitement</span>
                    <span class="font-semibold text-green-600">6.2 sec</span>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-slate-100">
                  <div class="flex items-center gap-2 text-xs text-slate-400">
                    <i class="ri-shield-check-line" />
                    <span>Chiffré AES-256 • Supervisé en continu</span>
                  </div>
                </div>
              </div>

              <!-- Floating Badges -->
              <div class="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 border border-slate-100 animate-bounce">
                <div class="flex items-center gap-2">
                  <i class="ri-flash-line text-yellow-500" />
                  <span class="text-sm font-semibold text-slate-900">< 10s</span>
                </div>
              </div>
              <div class="absolute -bottom-2 -left-4 bg-white rounded-xl shadow-lg px-4 py-2 border border-slate-100">
                <div class="flex items-center gap-2">
                  <i class="ri-bank-card-line text-blue-500" />
                  <span class="text-sm font-semibold text-slate-900">8 pays UEMOA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Background Decor -->
      <div class="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-yellow-50/50 to-transparent" />
      <div class="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-yellow-100/30 rounded-full blur-3xl" />
      <div class="absolute top-1/2 right-1/4 -z-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-white border-y border-slate-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center space-y-1">
            <p class="text-3xl md:text-4xl font-bold text-slate-900">
              8
            </p>
            <p class="text-sm text-slate-500">
              Pays UEMOA connectés
            </p>
          </div>
          <div class="text-center space-y-1">
            <p class="text-3xl md:text-4xl font-bold text-slate-900">
              50+
            </p>
            <p class="text-sm text-slate-500">
              Institutions publiques
            </p>
          </div>
          <div class="text-center space-y-1">
            <p class="text-3xl md:text-4xl font-bold text-slate-900">
              < 10s
            </p>
            <p class="text-sm text-slate-500">
              Temps de transaction
            </p>
          </div>
          <div class="text-center space-y-1">
            <p class="text-3xl md:text-4xl font-bold text-slate-900">
              24/7
            </p>
            <p class="text-sm text-slate-500">
              Disponibilité continue
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="inline-block text-sm font-semibold text-yellow-600 bg-yellow-50 px-4 py-1.5 rounded-full mb-4">
            Services
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
            Une plateforme au service de l'État
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            Des transactions sécurisées pour toutes les entités publiques du Togo
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            :color="service.color"
          />
        </div>
      </div>
    </section>

    <!-- Documentation Section -->
    <section id="documentation" class="py-20 bg-slate-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4">
              Développeurs
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
              Intégrez l'API du Trésor Public
            </h2>
            <p class="mt-4 text-lg text-slate-600">
              Connectez vos systèmes à la plateforme interopérable via notre API REST
              conforme aux standards OpenAPI 3.0.
            </p>
            <ul class="mt-6 space-y-3">
              <li class="flex items-start gap-3">
                <i class="ri-checkbox-circle-fill text-green-500 mt-1" />
                <span class="text-slate-600">Documentation interactive avec exemples de code</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="ri-checkbox-circle-fill text-green-500 mt-1" />
                <span class="text-slate-600">Sandbox pour tests en environnement sécurisé</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="ri-checkbox-circle-fill text-green-500 mt-1" />
                <span class="text-slate-600">Webhooks pour notifications en temps réel</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="ri-checkbox-circle-fill text-green-500 mt-1" />
                <span class="text-slate-600">SDK disponibles pour plusieurs langages</span>
              </li>
            </ul>
            <div class="mt-8 flex flex-wrap gap-4">
              <Button size="lg" class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all">
                <i class="ri-file-code-line mr-2" />
                Explorer l'API
              </Button>
              <Button size="lg" variant="outline" class="border-2">
                <i class="ri-github-line mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400" />
                <div class="w-3 h-3 rounded-full bg-yellow-400" />
                <div class="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span class="text-xs text-slate-400 font-mono">API-Trésor • OpenAPI 3.0</span>
            </div>
            <pre class="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm">
              <code class="text-slate-200 font-mono">
<span class="text-blue-400">POST</span> <span class="text-yellow-300">/api/v1/payments</span>
<span class="text-slate-500">{</span>
  <span class="text-purple-400">"institutionId"</span>: <span class="text-green-400">"DGTCP-001"</span>,
  <span class="text-purple-400">"amount"</span>: <span class="text-orange-400">2450000</span>,
  <span class="text-purple-400">"currency"</span>: <span class="text-green-400">"XOF"</span>,
  <span class="text-purple-400">"beneficiary"</span>: <span class="text-slate-500">{</span>
    <span class="text-purple-400">"name"</span>: <span class="text-green-400">"Direction des Impôts"</span>,
    <span class="text-purple-400">"accountId"</span>: <span class="text-green-400">"TG-001-2026"</span>
  <span class="text-slate-500">},</span>
  <span class="text-purple-400">"reference"</span>: <span class="text-green-400">"TGO-2026-08-19-0042"</span>
<span class="text-slate-500">}</span>
              </code>
            </pre>
            <div class="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <i class="ri-check-line text-green-500" />
              <span>Exemple de requête de paiement</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Integration Flow -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
            Comment ça fonctionne ?
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            Une architecture simple et efficace pour des transactions transparentes
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-6 relative">
          <!-- Connecting line (desktop) -->
          <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <StepCard
            v-for="(step, index) in steps"
            :key="index"
            :number="index + 1"
            :title="step.title"
            :description="step.description"
            :icon="step.icon"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-yellow-600 to-yellow-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            Rejoignez la révolution des paiements publics
          </h2>
          <p class="mt-4 text-yellow-100 text-lg">
            Connectez votre institution au PI-SPI et bénéficiez de transactions
            instantanées, sécurisées et interopérables.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" class="bg-white text-yellow-700 hover:bg-yellow-50 shadow-xl hover:shadow-2xl transition-all px-8">
              <i class="ri-user-add-line mr-2" />
              Créer un compte institutionnel
            </Button>
            <Button size="lg" variant="outline" class="border-white text-white hover:bg-white/10 transition-all px-8">
              <i class="ri-phone-line mr-2" />
              Contacter le support
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">T</span>
              </div>
              <span class="text-white font-bold">Trésor Public Togo</span>
            </div>
            <p class="text-sm">
              Plateforme interopérable de paiement instantané connectée au PI-SPI de la BCEAO.
            </p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">
              Liens utiles
            </h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Documentation</a></li>
              <li><a href="#" class="hover:text-white transition">Statut des services</a></li>
              <li><a href="#" class="hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">
              Ressources
            </h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">API Reference</a></li>
              <li><a href="#" class="hover:text-white transition">GitHub</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
              <li><a href="#" class="hover:text-white transition">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">
              Contact
            </h4>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <i class="ri-mail-line" />
                <a href="mailto:support@tresorpublic.gouv.tg" class="hover:text-white transition">support@tresorpublic.gouv.tg</a>
              </li>
              <li class="flex items-center gap-2">
                <i class="ri-phone-line" />
                <span>+228 22 23 45 67</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="ri-map-pin-line" />
                <span>Lomé, Togo</span>
              </li>
            </ul>
            <div class="flex gap-4 mt-4">
              <a href="#" class="text-slate-400 hover:text-white transition"><i class="ri-twitter-x-line" /></a>
              <a href="#" class="text-slate-400 hover:text-white transition"><i class="ri-linkedin-line" /></a>
              <a href="#" class="text-slate-400 hover:text-white transition"><i class="ri-youtube-line" /></a>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          © 2026 Trésor Public du Togo. Tous droits réservés.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Optional: custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
