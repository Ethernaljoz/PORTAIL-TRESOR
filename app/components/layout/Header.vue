<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: '',
})

const { user } = useAuth()

function getUserInitials(): string {
  if (!user.value)
    return 'AC'
  const first = user.value.first_name?.[0] || ''
  const last = user.value.last_name?.[0] || ''
  return (first + last).toUpperCase() || 'AC'
}

function getUserName(): string {
  if (!user.value)
    return 'Admin CNHU'
  return [user.value.first_name, user.value.last_name].filter(Boolean).join(' ') || 'Admin CNHU'
}

function getUserRole(): string {
  if (!user.value)
    return 'Administrateur'
  return user.value.profile.toString() === '2' ? 'Administrateur' : 'Utilisateur'
}
</script>

<template>
  <header class="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
    <div class="flex items-center justify-between px-6 lg:px-5 py-2 gap-6">
      <div class="flex items-center gap-3 min-w-0">
        <SidebarTrigger class="" />
        <div class="min-w-0 border-l border-border pl-3">
          <h1 class="text-base font-semibold text-foreground truncate">
            {{ title }}
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <!-- <button
          class="relative size-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition"
        >
          <Bell class="size-[18px]" />
          <span class="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
        </button> -->

        <div class="flex items-center gap-3 pl-3 border-l border-border">
          <div class="text-right hidden sm:block">
            <ClientOnly>
              <div class="text-[13px] font-semibold text-foreground leading-tight">
                {{ getUserName() }}
              </div>
              <div class="text-[11px] text-muted-foreground">
                {{ getUserRole() }}
              </div>
              <template #fallback>
                <div class="text-[13px] font-semibold text-foreground leading-tight">
                  Admin CNHU
                </div>
                <div class="text-[11px] text-muted-foreground">
                  Administrateur
                </div>
              </template>
            </ClientOnly>
          </div>
          <ClientOnly>
            <div
              class="size-10 rounded-full bg-linear-to-br from-primary to-[oklch(0.42_0.18_263)] text-primary-foreground flex items-center justify-center text-[13px] font-semibold"
            >
              {{ getUserInitials() }}
            </div>
            <template #fallback>
              <div class="size-10 rounded-full bg-linear-to-br from-primary to-[oklch(0.42_0.18_263)] text-primary-foreground flex items-center justify-center text-[13px] font-semibold">
                AC
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </header>
</template>
