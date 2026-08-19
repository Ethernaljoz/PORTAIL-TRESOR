<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { roles, permissions } = useUsersData()

const selectedRole = ref<string | null>(null)

const selectedRoleData = computed(() => roles.value.find(r => r.id === selectedRole.value))

const modules = computed(() => {
  const mods = [...new Set(permissions.value.map(p => p.module))]
  return mods
})

function hasPermission(rolePermissions: string[], permId: string): boolean {
  return rolePermissions.includes(permId)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold">Gestion des acces</h1>
      <p class="text-sm text-muted-foreground mt-1">Roles et permissions des utilisateurs</p>
    </div>

    <!-- Roles cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <Card
        v-for="role in roles"
        :key="role.id"
        class="hover:shadow-md transition-all cursor-pointer"
        :class="{ 'ring-2 ring-primary': selectedRole === role.id }"
        @click="selectedRole = role.id"
      >
        <CardContent class="p-5">
          <h3 class="font-semibold text-foreground">{{ role.nom }}</h3>
          <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{{ role.description }}</p>
          <div class="mt-3 pt-3 border-t border-border">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Utilisateurs</span>
              <span class="font-semibold">{{ role.nbUtilisateurs }}</span>
            </div>
            <div class="flex items-center justify-between text-xs mt-1">
              <span class="text-muted-foreground">Permissions</span>
              <span class="font-semibold">{{ role.permissions.length }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Permissions detail -->
    <Card v-if="selectedRoleData">
      <CardHeader>
        <CardTitle class="text-base">Permissions — {{ selectedRoleData.nom }}</CardTitle>
        <CardDescription>{{ selectedRoleData.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div v-for="mod in modules" :key="mod" class="space-y-2">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ mod }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="perm in permissions.filter(p => p.module === mod)"
                :key="perm.id"
                :class="[
                  'inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  hasPermission(selectedRoleData.permissions, perm.id)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-muted text-muted-foreground border border-border opacity-50',
                ]"
              >
                <Icon :name="hasPermission(selectedRoleData.permissions, perm.id) ? 'i-lucide-check' : 'i-lucide-x'" class="size-3 mr-1.5" />
                {{ perm.label }}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card v-else>
      <CardContent class="flex items-center justify-center h-32">
        <p class="text-muted-foreground text-sm">Selectionnez un role pour voir ses permissions</p>
      </CardContent>
    </Card>
  </div>
</template>
