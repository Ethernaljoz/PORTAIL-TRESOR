<script setup>
const router = useRouter()
</script>

<template>
  <div class="h-svh">
    <div class="m-auto h-full w-full flex flex-col items-center justify-center gap-2">
      <h1 class="text-[7rem] font-bold leading-tight">
        404
      </h1>
      <span class="font-medium">Page introuvable</span>
      <p class="text-center text-muted-foreground">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div class="mt-6 flex gap-4">
        <Button variant="outline" @click="router.back()">
          Retour
        </Button>
        <Button @click="router.push('/portal')">
          Accueil
        </Button>
      </div>
    </div>
  </div>
</template>
