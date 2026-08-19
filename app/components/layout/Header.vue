<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="border-b border-border bg-background/80 backdrop-blur-md">
    <div class="flex items-center gap-4 px-4 h-16">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="h-4" />
      <div class="flex-1 min-w-0">
        <h1 class="text-lg font-semibold text-foreground truncate">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-xs text-muted-foreground mt-0.5">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </header>
</template>
