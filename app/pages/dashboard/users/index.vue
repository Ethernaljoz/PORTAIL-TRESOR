<script setup lang="ts">
definePageMeta({ requiresAuth: true })

const { utilisateurs } = useMockData()

const roleFilter = ref('')
const statutFilter = ref('')

const filteredUsers = computed(() => {
  return utilisateurs.value.filter(u => {
    if (roleFilter.value && u.role !== roleFilter.value) return false
    if (statutFilter.value && u.statut !== statutFilter.value) return false
    return true
  })
})

const uniqueRoles = computed(() => [...new Set(utilisateurs.value.map(u => u.role))])

function statutColor(statut: string): string {
  const map: Record<string, string> = {
    'Actif': 'text-emerald-600 bg-emerald-50 ring-emerald-200',
    'Inactif': 'text-destructive bg-destructive/10 ring-destructive/20',
    'En attente': 'text-amber-600 bg-amber-50 ring-amber-200',
  }
  return map[statut] || 'text-muted-foreground bg-muted'
}

function roleColor(role: string): string {
  const map: Record<string, string> = {
    'Administrateur': 'text-red-600 bg-red-50',
    'Superviseur': 'text-purple-600 bg-purple-50',
    'Gestionnaire': 'text-blue-600 bg-blue-50',
    'Operateur': 'text-emerald-600 bg-emerald-50',
    'Lecteur': 'text-muted-foreground bg-muted',
  }
  return map[role] || 'text-muted-foreground bg-muted'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Utilisateurs</h1>
        <p class="text-sm text-muted-foreground mt-1">Gestion des utilisateurs de la plateforme</p>
      </div>
      <button class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all inline-flex items-center gap-2">
        <Icon name="i-lucide-plus" class="size-4" />
        Nouvel utilisateur
      </button>
    </div>

    <!-- Filtres -->
    <Card>
      <CardContent class="p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Role</label>
            <select v-model="roleFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm min-w-[160px]">
              <option value="">Tous</option>
              <option v-for="r in uniqueRoles" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
          <div class="space-y-1.5">
            <label class="text-[12px] font-medium text-muted-foreground">Statut</label>
            <select v-model="statutFilter" class="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="">Tous</option>
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <div class="ml-auto text-[13px] text-muted-foreground">
            {{ filteredUsers.length }} utilisateur(s)
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Table -->
    <Card>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Nom</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Institution</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th class="text-left py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Derniere connexion</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-muted/50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
                      {{ user.prenom[0] }}{{ user.nom[0] }}
                    </div>
                    <div>
                      <div class="text-sm font-medium">{{ user.prenom }} {{ user.nom }}</div>
                      <div class="text-[11px] text-muted-foreground">{{ user.telephone }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground">{{ user.email }}</td>
                <td class="py-3 px-4 text-xs text-muted-foreground max-w-[150px] truncate">{{ user.institution }}</td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold', roleColor(user.role)]">
                    {{ user.role }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset', statutColor(user.statut)]">
                    {{ user.statut }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">{{ user.derniereConnexion || 'Jamais' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
