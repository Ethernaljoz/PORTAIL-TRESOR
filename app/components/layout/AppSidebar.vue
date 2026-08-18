<script setup lang="ts">
import type { NavLink, PermissionCheck } from '~/types/nav'
import { LogOut } from 'lucide-vue-next'
import { useSidebar } from '~/components/ui/sidebar'
import { navMenu } from '~/constants/menus'

const route = useRoute()
const { logout } = useAuth()
const { setOpenMobile } = useSidebar()
const { can } = usePermissions()

function itemVisible(item: NavLink): boolean {
  if (!item.permission)
    return true
  if (typeof item.permission === 'string')
    return can(item.permission)
  return item.permission.some((p: PermissionCheck) => can(p.module, p.permission))
}

const visibleMenu = computed(() =>
  navMenu
    .map(group => ({
      ...group,
      items: group.items.filter(itemVisible),
    }))
    .filter(group => group.items.length > 0),
)
</script>

<template>
  <Sidebar class="border-r border-border bg-sidebar shrink-0">
    <div class="flex items-center gap-3 px-6 py-5 ">
      <img
        src="assets/images/logo.png"
        alt="NSIA-HKM"
        class="w-auto h-10 object-cover "
      >
      <div>
        <div class="text-[15px] font-semibold text-foreground leading-tight">
          NSIA AssurTech
        </div>
        <!-- <div class="text-[11px] text-muted-foreground">
          Espace admin
        </div> -->
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-3 py-5 space-y-6">
      <ClientOnly>
        <div v-for="(group, i) in visibleMenu" :key="i">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
            {{ group.heading }}
          </div>
          <nav class="space-y-1">
            <NuxtLink
              v-for="item in group.items"
              :key="item.link"
              :to="item.link"
              class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all"
              :class="route.path === item.link
                ? 'bg-primary text-primary-foreground shadow-(--shadow-soft)'
                : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'"
              @click="setOpenMobile(false)"
            >
              <Icon :name="item.icon" class="size-4.5 transition-transform group-hover:scale-110" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </nav>
        </div>
        <template #fallback>
          <div class="space-y-6">
            <div v-for="i in 3" :key="i" class="space-y-2">
              <div class="h-2.5 w-16 bg-muted rounded" />
              <div v-for="j in 3" :key="j" class="h-9 w-full bg-muted/50 rounded-lg" />
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>

    <div class="px-3 py-3 border-t border-border">
      <button
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        @click="logout()"
      >
        <LogOut class="size-[18px]" />
        <span>Déconnexion</span>
      </button>
    </div>
  </Sidebar>
</template>
