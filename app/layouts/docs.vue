<script setup lang="ts">
import { DOC_SECTIONS } from '~/constants/mock-data'

const route = useRoute()
const { isOpen, toggle } = useDocsSidebar()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <LayoutDocsHeader @toggle-sidebar="toggle" />
    <div class="flex flex-1">
      <aside
        class="w-64 border-r border-border bg-muted/20 overflow-y-auto hidden lg:block shrink-0"
      >
        <nav class="p-4 space-y-1 sticky top-0">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-3">
            Documentation
          </div>
          <NuxtLink
            v-for="section in DOC_SECTIONS"
            :key="section.id"
            :to="section.id === 'introduction' ? '/docs' : `/docs/${section.id}`"
            class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all"
            :class="(section.id === 'introduction' ? route.path === '/docs' : route.path === `/docs/${section.id}`)
              ? 'bg-primary text-primary-foreground font-medium'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
          >
            <Icon :name="section.icon" class="size-4" />
            <span>{{ section.title }}</span>
          </NuxtLink>
        </nav>
      </aside>
      <main class="flex-1 min-w-0 overflow-y-auto">
        <div class="max-w-4xl mx-auto px-6 lg:px-10 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
