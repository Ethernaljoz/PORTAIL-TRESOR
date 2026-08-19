import { shallowRef } from 'vue'
import { mockUtilisateurs, mockRoles, allPermissions } from '~~/sample-data-mock'
import type { Utilisateur, Role, Permission } from '~/types/tresor'

export function useUsersData() {
  const utilisateurs = shallowRef<Utilisateur[]>(mockUtilisateurs)
  const roles = shallowRef<Role[]>(mockRoles)
  const permissions = shallowRef<Permission[]>(allPermissions)
  return { utilisateurs, roles, permissions }
}
