<script setup lang="ts">
defineProps<{
  reverse?: boolean
}>()
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <div
      class="hidden lg:flex flex-1 relative overflow-hidden"
      :class="{ 'order-last': reverse }"
    >
      <img
        src="/img/img_cnhu.jpeg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
      <div class="relative z-10 flex flex-col justify-between p-12 w-full">
        <div />
        <div class="max-w-md">
          <h2 class="text-[28px] font-bold text-white leading-[1.15]">
            Soin &<br>Excellence
          </h2>
          <p class="mt-3 text-[14px] text-white/70 leading-relaxed">
            Plateforme de gestion des consultations et paiements du Centre National Hospitalier et Universitaire Hubert Koutoukou Maga.
          </p>
          <div class="mt-6 flex items-center gap-4 text-white/50 text-[11px]">
            <span class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-white/40" />
              Bénin
            </span>
            <span class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-white/40" />
              Cotonou
            </span>
          </div>
        </div>
        <div class="text-[11px] text-white/30">
          © 2026 CNHU-HKM. Tous droits réservés.
        </div>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <slot />
    </div>
  </div>
</template>
