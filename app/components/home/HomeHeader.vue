<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <header class=" top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center space-x-6">
          <NuxtLink to="/" class="flex items-center">
            <img src="../../assets/images/logo.png" alt="logo" class="h-10 w-auto">
          </NuxtLink>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/home" class="text-gray-700 hover:text-blue-600 font-medium">
              Accueil
            </NuxtLink>

            <!-- Dropdown Produits -->
            <div class="relative group">
              <button
                class="flex items-center text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              >
                Produits
                <svg
                  class="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                class="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                <NuxtLink
                  to="/automobile"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Assurance Auto
                </NuxtLink>
                <!-- <NuxtLink
                  to="/habitation"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Assurance Multirisque Habitation
                </NuxtLink> -->
                <NuxtLink
                  to="/voyage"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Assurance Voyage
                </NuxtLink>
              </div>
            </div>

            <NuxtLink to="/suggestion" class="text-gray-700 hover:text-blue-600 font-medium">
              Suggestions
            </NuxtLink>

            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </NuxtLink>
          </nav>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Panier (statique) -->
          <button class="relative">
            <svg
              class="w-6 h-6 text-gray-700 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21h.01M17 21h.01"
              />
            </svg>
            <span
              class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1"
            >
              2
            </span>
          </button>

          <!-- Auth Buttons (statique) -->
          <div class="hidden md:flex items-center space-x-3">
            <NuxtLink
              to="/login"
              class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Se connecter
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-4 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-100 transition"
            >
              Créer un compte
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden focus:outline-none"
            @click="isOpen = !isOpen"
          >
            <svg
              class="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white shadow-lg">
      <div class="px-4 py-3 space-y-3">
        <NuxtLink to="/" class="block text-gray-700">
          Accueil
        </NuxtLink>
        <NuxtLink to="/automobile" class="block text-gray-700">
          Assurance Auto
        </NuxtLink>
        <NuxtLink to="/habitation" class="block text-gray-700">
          Assurance Habitation
        </NuxtLink>
        <NuxtLink to="/voyage" class="block text-gray-700">
          Assurance Voyage
        </NuxtLink>
        <NuxtLink to="/suggestion" class="block text-gray-700">
          Suggestions
        </NuxtLink>
        <NuxtLink to="/contact" class="block text-gray-700">
          Contact
        </NuxtLink>

        <hr>

        <NuxtLink to="/login" class="block text-gray-700">
          Se connecter
        </NuxtLink>
        <NuxtLink to="/register" class="block text-gray-700">
          Créer un compte
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
