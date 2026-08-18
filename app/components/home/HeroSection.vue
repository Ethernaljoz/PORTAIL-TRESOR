<template>
  <section class="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <img
      src="../../assets/images/slider.png"
      alt="NSIA Assurance"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/10" />

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        NSIA e-Commerce
      </h1>

      <p class="text-lg md:text-xl mb-8 text-gray-200">
        Souscrivez désormais aux différentes offres de NSIA sans vous déplacer
      </p>

      <NuxtLink
        to="/automobile"
        class="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold shadow-lg"
      >
        Souscrire à une offre
      </NuxtLink>
    </div>
  </section>
</template>
