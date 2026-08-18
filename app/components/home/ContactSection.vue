<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <!-- Image -->
        <div
          class="h-[400px] rounded-3xl bg-center bg-cover"
          style="background-image: url('https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2022/08/se-lancer-a-deux-dans-une-entreprise.jpg')"
        />

        <!-- Content -->
        <div class="relative">
          <div class="bg-white rounded-3xl shadow-xl p-10 relative overflow-hidden">
            <!-- Decorative Icon Background -->
            <div class="absolute -top-10 -right-10 opacity-10">
              <svg width="160" height="160" viewBox="0 0 188 188" fill="none">
                <circle cx="94" cy="94" r="94" fill="#3B82F6" />
              </svg>
            </div>

            <h3 class="text-3xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h3>

            <p class="text-gray-600 mb-6 leading-relaxed">
              Si vous avez des questions ou rencontrez une difficulté,
              contactez-nous au
              <span class="font-semibold text-gray-800">
                (228) 22 20 81 50 / 20 81 51 / 23 49 00
              </span>
              ou envoyez-nous un e-mail à
              <span class="font-semibold text-gray-800">
                info@groupensia.com
              </span>
            </p>

            <NuxtLink
              to="/contact"
              class="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md"
            >
              Parler à un expert
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
