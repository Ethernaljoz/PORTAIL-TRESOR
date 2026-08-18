<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Heading -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
          Comment ça marche ?
        </h2>
        <div class="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-10">
        <!-- Step 1 -->
        <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center">
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <!-- Icon -->
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" />
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold mb-3">
            Souscription
          </h3>
          <p class="text-gray-600">
            Faites le choix de votre produit d'assurance
          </p>
        </div>

        <!-- Step 2 -->
        <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center">
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm4 4h10v10H7V7z" />
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold mb-3">
            Police d’assurance
          </h3>
          <p class="text-gray-600">
            Obtenez le meilleur prix possible avec nous
          </p>
        </div>

        <!-- Step 3 -->
        <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center">
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <!-- <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 12h20M12 2v20"/>
              </svg> -->

              <svg width="60" height="60" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 50.0725C0 22.4583 22.3858 0.0725098 50 0.0725098V0.0725098C77.6142 0.0725098 100 22.4583 100 50.0725V50.0725C100 77.6867 77.6142 100.073 50 100.073V100.073C22.3858 100.073 0 77.6867 0 50.0725V50.0725Z" fill="" /> <path d="M28.6429 53.073H24.9286C24.416 53.073 24 52.657 24 52.1445V35.43C24 34.9175 24.416 34.5015 24.9286 34.5015H28.6429C29.1555 34.5015 29.5715 34.9175 29.5715 35.43V52.1445C29.5715 52.657 29.1555 53.073 28.6429 53.073Z" fill="white" /> <path d="M51.8574 51.2159H32.3572V35.838C35.3652 34.1641 45.0212 28.93 48.1437 28.93C49.1812 28.93 50.6484 29.627 51.7763 30.2603L44.3514 40.8647C43.489 42.096 44.3693 43.7873 45.8724 43.7873H51.6587C53.509 43.7873 55.2238 45.0514 55.5209 46.8776C55.8992 49.2052 54.1132 51.2159 51.8574 51.2159Z" fill="white" /> <path d="M75.8321 40.562L53.5772 72.3448C53.2831 72.7651 52.7043 72.8667 52.284 72.5726L35.1052 60.545C34.6849 60.251 34.5828 59.6722 34.8774 59.2518L38.5534 54.0023H43.0879L41.6331 56.0798C43.286 57.2232 43.7738 59.4827 42.5462 61.221L49.1082 65.8157C50.2541 64.1622 52.5149 63.6787 54.2513 64.9081L69.072 43.7415C67.4235 42.5975 66.9338 40.3379 68.1676 38.5978L61.6013 33.9988C60.4579 35.6492 58.1978 36.1376 56.4582 34.9063L52.1905 41.0015H47.6559L57.1318 27.4684C57.4258 27.0481 58.0046 26.9466 58.425 27.2406L75.6037 39.2688C76.024 39.5629 76.1262 40.1417 75.8321 40.562Z" fill="white" /> </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold mb-3">
            Paiement
          </h3>
          <p class="text-gray-600">
            Payez pour terminer votre souscription
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
