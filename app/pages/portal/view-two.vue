<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-[#d11135] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              TP
            </div>
            <span class="font-bold text-lg text-[#006a4f]">Trésor Public</span>
            <span class="text-xs text-gray-400 font-medium">TOGO</span>
          </div>
          <nav class="hidden lg:flex items-center gap-6 text-sm">
            <a href="#" class="text-gray-600 hover:text-[#d11135] transition-colors font-medium">Accueil</a>
            <a href="#" class="text-gray-600 hover:text-[#d11135] transition-colors font-medium">Transactions</a>
            <a href="#" class="text-gray-600 hover:text-[#d11135] transition-colors font-medium">API</a>
            <a href="#" class="text-gray-600 hover:text-[#d11135] transition-colors font-medium">Documentation</a>
            <a href="#" class="text-gray-600 hover:text-[#d11135] transition-colors font-medium">Support</a>
          </nav>
        </div>
        <div class="flex items-center gap-3">
          <button class="text-sm text-[#006a4f] font-medium hover:underline hidden sm:block">
            FR
          </button>
          <button class="bg-[#d11135] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#b00e2d] transition-colors shadow-sm">
            Se connecter
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#006a4f] to-[#004d3a] text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#ffcf11] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-[#d11135] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>
      <div class="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6 border border-white/10">
            <span class="w-2 h-2 bg-[#ffcf11] rounded-full animate-pulse"></span>
            PI-SPI · Transactions instantanées
          </div>
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Modernisation des<br>
            <span class="text-[#ffcf11]">deniers publics</span> du Togo
          </h1>
          <p class="text-lg text-white/80 mt-4 max-w-xl">
            Connectez-vous à la Plateforme Interopérable du Système de Paiement Instantané
            pour gérer vos encaissements et décaissements en temps réel.
          </p>
          <div class="flex flex-wrap gap-4 mt-8">
            <button class="bg-[#ffcf11] text-[#006a4f] px-8 py-3.5 rounded-xl font-bold hover:bg-[#e6ba0f] transition-colors shadow-lg shadow-[#ffcf11]/20">
              Accéder au portail
            </button>
            <button class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Voir la démo
            </button>
          </div>
          <div class="flex items-center gap-8 mt-10 text-sm text-white/60">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#ffcf11]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span><strong class="text-white">8</strong> pays UEMOA</span>
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#ffcf11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span><strong class="text-white">&lt;10s</strong> de règlement</span>
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#ffcf11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span><strong class="text-white">AES-256</strong> sécurité</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats / Institutions -->
    <section class="border-b border-gray-100 bg-gray-50/50">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-[#006a4f]">15+</div>
            <div class="text-xs text-gray-500">Institutions connectées</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-[#006a4f]">24/7</div>
            <div class="text-xs text-gray-500">Disponibilité</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-[#006a4f]">0€</div>
            <div class="text-xs text-gray-500">Frais P2P</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-[#006a4f]">100%</div>
            <div class="text-xs text-gray-500">Traçabilité</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / Use Cases -->
    <section class="py-16 lg:py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-[#d11135] font-semibold text-sm tracking-wider uppercase">Services</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-[#006a4f] mt-2">
            Cas d'usage PI-SPI
          </h2>
          <p class="text-gray-500 mt-3">
            La plateforme couvre nativement l'ensemble des besoins de paiement
            des institutions publiques et privées.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, idx) in useCases" :key="idx"
               class="group bg-gray-50/80 hover:bg-white rounded-xl p-6 border border-transparent hover:border-[#d11135]/20 hover:shadow-lg transition-all duration-300 cursor-default">
            <div class="w-12 h-12 bg-[#d11135]/10 rounded-lg flex items-center justify-center text-[#d11135] group-hover:bg-[#d11135] group-hover:text-white transition-colors">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-[#006a4f] mt-4">{{ item.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- API Documentation teaser -->
    <section class="py-16 lg:py-20 bg-[#006a4f]/5">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-[#d11135] font-semibold text-sm tracking-wider uppercase">Développeurs</span>
            <h2 class="text-3xl lg:text-4xl font-bold text-[#006a4f] mt-2">
              API-Trésor basée sur PI-SPI
            </h2>
            <p class="text-gray-600 mt-3">
              Intégrez facilement les paiements instantanés à vos applications
              grâce à notre API REST/JSON conforme OpenAPI 3.0.
            </p>
            <ul class="mt-6 space-y-3">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#d11135] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-600"><strong class="text-[#006a4f]">Règlement</strong> en moins de 10 secondes</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#d11135] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-600"><strong class="text-[#006a4f]">Sécurité</strong> chiffrement AES-256</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#d11135] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-600"><strong class="text-[#006a4f]">Traçabilité</strong> complète LAB/FT</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#d11135] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-600"><strong class="text-[#006a4f]">Gratuité</strong> des transferts P2P</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-4 mt-8">
              <button class="bg-[#d11135] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#b00e2d] transition-colors">
                Documentation API
              </button>
              <button class="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-medium hover:border-[#006a4f] hover:text-[#006a4f] transition-colors">
                Swagger UI
              </button>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative">
            <div class="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>API-Trésor · OpenAPI 3.0</span>
              <span class="ml-auto bg-[#006a4f]/10 text-[#006a4f] px-2 py-0.5 rounded">v1.0</span>
            </div>
            <pre class="bg-[#0a0a0f] text-gray-300 p-4 rounded-xl text-xs font-mono overflow-x-auto"><span class="text-yellow-400">POST</span> <span class="text-blue-400">/api/v1/paiement</span>
{
  <span class="text-pink-400">"montant"</span>: <span class="text-yellow-400">150000</span>,
  <span class="text-pink-400">"devise"</span>: <span class="text-green-400">"XOF"</span>,
  <span class="text-pink-400">"emetteur"</span>: <span class="text-green-400">"DGTCP"</span>,
  <span class="text-pink-400">"beneficiaire"</span>: <span class="text-green-400">"UEMOA"</span>,
  <span class="text-pink-400">"reference"</span>: <span class="text-green-400">"FACT-2025-001"</span>
}</pre>
            <div class="flex items-center gap-3 mt-4 text-xs text-gray-400">
              <span class="flex items-center gap-1"><span class="w-2 h-2 bg-green-400 rounded-full"></span> 200 OK</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 bg-blue-400 rounded-full"></span> AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ecosystem / Partners -->
    <section class="py-16 lg:py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-[#d11135] font-semibold text-sm tracking-wider uppercase">Écosystème</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-[#006a4f] mt-2">
            Participants connectés
          </h2>
          <p class="text-gray-500 mt-3">
            Une pluralité d'acteurs financiers de l'UEMOA interconnectés via PI-SPI.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-4 md:gap-8">
          <span v-for="p in participants" :key="p"
                class="bg-gray-50 border border-gray-100 px-5 py-2.5 rounded-full text-sm font-medium text-gray-700 hover:border-[#006a4f] hover:text-[#006a4f] transition-colors">
            {{ p }}
          </span>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0a0a0f] text-gray-400 pt-12 pb-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-[#d11135] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                TP
              </div>
              <span class="font-bold text-white text-sm">Trésor Public</span>
              <span class="text-xs text-gray-600">TOGO</span>
            </div>
            <p class="text-sm text-gray-500">
              Direction Générale du Trésor et de la Comptabilité Publique.
            </p>
            <div class="flex gap-4 mt-4">
              <a href="#" class="text-gray-500 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.99C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="text-white font-semibold text-sm mb-3">PI-SPI</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Présentation</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Participants</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Cas d'usage</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Sécurité</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold text-sm mb-3">API</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Swagger UI</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Statuts</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold text-sm mb-3">Contact</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Nous écrire</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Assistance technique</a></li>
              <li class="text-gray-500">Lomé, Togo</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          &copy; 2026 Trésor Public du Togo — Connexion à PI-SPI (BCEAO)
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const useCases = [
  {
    icon: 'UserIcon',
    title: 'Paiements P2P',
    desc: 'Transferts instantanés entre particuliers, sans frais.'
  },
  {
    icon: 'QrCodeIcon',
    title: 'Paiements QR Code',
    desc: 'Règlements en magasin ou en ligne via code QR sécurisé.'
  },
  {
    icon: 'ClockIcon',
    title: 'Paiements programmés',
    desc: 'Planification des transactions pour les échéances futures.'
  },
  {
    icon: 'BuildingOfficeIcon',
    title: 'Paiements B2B',
    desc: 'Transactions entre entreprises avec traçabilité complète.'
  },
  {
    icon: 'BanknotesIcon',
    title: 'Paiements vers Administrations',
    desc: 'Impôts, taxes, douanes, amendes et redevances.'
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Request to Pay',
    desc: 'Demande de paiement initiée par le créancier.'
  }
]

const participants = [
  'Banques', 'Établissements de monnaie électronique',
  'Établissements de paiement', 'Institutions de microfinance',
  'Trésors Publics', 'Administrations', 'UEMOA', 'BCEAO'
]
</script>