<!-- <script setup lang="ts">
const guarantees = [
  "Responsabilité civile",
  "Défense / Recours",
  "Incendie",
  "Vol simple",
  "Vol avec braquage",
  "Vol accessoires",
  "Vol accessoires hors garage",
  "Bris de glaces",
  "Dommages tous accidents",
  "Individuel conducteur",
  "Sécurité routière",
  "Assistance",
]
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 space-y-16">

      <div class="grid md:grid-cols-2 gap-12 items-center">

        <div class="rounded-3xl overflow-hidden shadow-lg">
          <img
            src="../../assets/images/nsia-auto.png"
            alt="Assurance Auto"
            class="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Assurance Auto
          </h2>

          <p class="text-gray-600 leading-relaxed mb-8">
            Couvrez les dommages matériels et / ou corporels que votre véhicule
            peut occasionner à autrui et à vous-mêmes.
          </p>

          <NuxtLink
            to="/assurance-automobile/subscription"
            class="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition shadow-md"
          >
            Souscrire
          </NuxtLink>
        </div>

      </div>

      <div class="bg-white rounded-3xl shadow-xl p-10">

        <h3 class="text-2xl font-bold text-gray-900 mb-10">
          Liste des garanties
        </h3>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">

          <div v-for="(item, index) in guarantees" :key="index" class="flex items-start gap-3">
            <span class="w-6 h-1 bg-yellow-500 mt-3 rounded"></span>
            <span>{{ item }}</span>
          </div>

        </div>
      </div>

      <div class="flex items-center gap-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <svg
          class="w-8 h-8 text-yellow-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v5a1 1 0 11-2 0V8a1 1 0 011-1zm0 9a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
          />
        </svg>

        <p class="font-semibold text-gray-800">
          La durée par défaut couverte par l’assurance auto est d'un an.
        </p>
      </div>

    </div>
  </section>
</template>
 -->

<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Image -->
        <div class="relative">
          <img
            src="../../assets/images/nsia-auto.png"
            alt="Assurance Auto"
            class="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
          >

          <!-- Floating badge -->
          <!-- <div class="absolute bottom-6 left-6 bg-white shadow-lg rounded-2xl px-6 py-4">
            <p class="text-sm text-gray-500">À partir de</p>
            <p class="text-2xl font-bold text-blue-600">Flexible & Accessible</p>
          </div> -->
        </div>

        <!-- Content -->
        <div>
          <span class="text-blue-600 font-semibold uppercase tracking-wider">
            Assurance Auto
          </span>

          <h2 class="text-4xl font-bold text-gray-900 mt-4 leading-tight">
            Protégez votre véhicule et roulez en toute sérénité
          </h2>

          <p class="mt-6 text-gray-600 leading-relaxed">
            Couvrez les dommages matériels et corporels causés à autrui ou à vous-même.
            Nos formules s’adaptent à vos besoins et à votre budget.
          </p>

          <!-- Features -->
          <div class="mt-8 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-blue-600 rounded-full" />
              <p class="text-gray-700">
                Responsabilité civile obligatoire
              </p>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-blue-600 rounded-full" />
              <p class="text-gray-700">
                Dommages tous accidents
              </p>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-blue-600 rounded-full" />
              <p class="text-gray-700">
                Assistance & sécurité routière
              </p>
            </div>
          </div>

          <!-- CTA -->
          <div class="mt-10 flex gap-4">
            <NuxtLink
              to="/assurance-auto"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition"
            >
              Découvrir l’offre
            </NuxtLink>

            <NuxtLink
              to="/assurance-auto/souscription"
              class="px-8 py-4 border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl font-semibold transition"
            >
              Souscrire maintenant
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
