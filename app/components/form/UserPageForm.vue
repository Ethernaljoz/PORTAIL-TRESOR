<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Button from '../ui/button/Button.vue'

const currentTab = ref('details')
const indicatorRef = ref<HTMLElement | null>(null)
const tabRefs = {
  'details': ref<HTMLElement | null>(null),
  'feuille-de-soins': ref<HTMLElement | null>(null),
  'statistiques': ref<HTMLElement | null>(null),
  'sinistre-acte': ref<HTMLElement | null>(null),
}

const sectionRefs = {
  'details': ref<HTMLElement | null>(null),
  'feuille-de-soins': ref<HTMLElement | null>(null),
  'statistiques': ref<HTMLElement | null>(null),
  'sinistre-acte': ref<HTMLElement | null>(null),
}

function updateIndicator(tab: string) {
  const tabEl = tabRefs[tab as keyof typeof tabRefs].value
  if (tabEl && indicatorRef.value) {
    indicatorRef.value.style.left = `${tabEl.offsetLeft}px`
    indicatorRef.value.style.width = `${tabEl.offsetWidth}px`
  }
}

function onTabChange(tab: string) {
  currentTab.value = tab
  updateIndicator(tab)

  const sectionEl = sectionRefs[tab as keyof typeof sectionRefs].value
  if (sectionEl) {
    const globalHeaderHeight = 54
    const tabsHeaderHeight = 60 // Approximate height of the tabs bar
    const headerOffset = globalHeaderHeight + tabsHeaderHeight + 20
    const elementPosition = sectionEl.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

// Optional: Intersection Observer to update active tab on scroll
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Initial indicator position
  setTimeout(() => updateIndicator(currentTab.value), 100)

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        currentTab.value = id
        updateIndicator(id)
      }
    })
  }, {
    // Adjust rootMargin to account for both headers
    rootMargin: '-120px 0px -70% 0px',
  })

  Object.values(sectionRefs).forEach((ref) => {
    if (ref.value)
      observer?.observe(ref.value)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="relative bg-gray-50/50 pb-20">
    <!-- Sticky Tabs Header - Offset by global header height (54px) -->
    <div
      class="sticky top-[54px] z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-[--23px] py-3 overflow-x-auto"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-sm font-[400] text-[#8A8A8A] relative">
          <ul class="flex flex-row gap-8 items-center">
            <li :ref="tabRefs.details">
              <button
                class="tab-btn" :class="[currentTab === 'details' ? 'active' : '']"
                @click="onTabChange('details')"
              >
                Détails
              </button>
            </li>
            <li :ref="tabRefs['feuille-de-soins']">
              <button
                class="tab-btn" :class="[currentTab === 'feuille-de-soins' ? 'active' : '']"
                @click="onTabChange('feuille-de-soins')"
              >
                Feuille de soins
              </button>
            </li>
            <li :ref="tabRefs.statistiques">
              <button
                class="tab-btn" :class="[currentTab === 'statistiques' ? 'active' : '']"
                @click="onTabChange('statistiques')"
              >
                Statistiques
              </button>
            </li>
            <li :ref="tabRefs['sinistre-acte']">
              <button
                class="tab-btn" :class="[currentTab === 'sinistre-acte' ? 'active' : '']"
                @click="onTabChange('sinistre-acte')"
              >
                Sinistralité par actes
              </button>
            </li>
          </ul>
          <div ref="indicatorRef" class="indicator" />
        </div>
      </div>
    </div>

    <!-- Form Sections -->
    <div class="max-w-7xl mx-auto px-[--23px] pt-8 space-y-12">
      <!-- Details Section -->
      <section id="details" :ref="sectionRefs.details" class="section-card">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">
            Détails de l'utilisateur
          </h2>
          <span class="text-sm text-[#AB6838] bg-[#AB683810] px-3 py-1 rounded-full font-medium">Étape
            1</span>
        </div>
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Prénom</label>
            <div class="h-10 bg-gray-50 border border-gray-200 rounded-md animate-pulse" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Nom</label>
            <div class="h-10 bg-gray-50 border border-gray-200 rounded-md animate-pulse" />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <div class="h-10 bg-gray-50 border border-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </section>

      <!-- Feuille de soins Section -->
      <section id="feuille-de-soins" :ref="sectionRefs['feuille-de-soins']" class="section-card">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-800">
            Feuille de soins
          </h2>
          <span class="text-sm text-[#6E0D25] bg-[#6E0D2510] px-3 py-1 rounded-full font-medium">Étape
            2</span>
        </div>
        <div class="p-8 space-y-6">
          <div
            class="h-[200px] bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center text-blue-400 italic"
          >
            Contenu de la feuille de soins (Tableau / Liste)
          </div>
        </div>
      </section>

      <!-- Statistiques Section -->
      <section id="statistiques" :ref="sectionRefs.statistiques" class="section-card">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">
            Statistiques
          </h2>
          <span class="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">Aperçu</span>
        </div>
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="i in 3" :key="i"
              class="h-32 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-600">
                  --%
                </div>
                <div class="text-xs text-orange-400">
                  Indicateur {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sinistralité Section -->
      <section id="sinistre-acte" :ref="sectionRefs['sinistre-acte']" class="section-card">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">
            Sinistralité par actes
          </h2>
          <span class="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">Détails</span>
        </div>
        <div class="p-8">
          <div class="space-y-4">
            <div v-for="i in 4" :key="i" class="h-4 bg-green-50 rounded-full overflow-hidden">
              <div class="h-full bg-green-200" :style="{ width: `${25 * i}%` }" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="fixed z-10 bottom-0 border-t w-full px-12 py-4  bg-gray-50">
    <div class="">
      <Button>Submit</Button>
    </div>
  </div>
</template>

<style scoped>
.tab-btn {
    position: relative;
    /* padding: 8px 4px; */
    font-weight: 400;
    color: #8A8A8A;
    transition: all 0.3s ease;
    border: none;
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
}

.tab-btn.active {
    color: #000;
    font-weight: 600;
}

.indicator {
    height: 3px;
    background-color: #000;
    border-radius: 4px 4px 0 0;
    position: absolute;
    bottom: -12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-card {
    background: white;
    border-radius: 12px;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
    overflow: hidden;
    scroll-margin-top: 100px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-card:hover {
    /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); */
}

/* Animations placeholder */
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
