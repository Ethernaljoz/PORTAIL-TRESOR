<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { usePermissions } from '~/composables/usePermissions'

definePageMeta({
  title: 'Droits utilisateur',
  requiresAuth: true,
})

const route = useRoute()
const router = useRouter()
const { $axios } = useNuxtApp()
const { can, isPermissionsReady } = usePermissions()

const hasAccess = computed(() => can('users', 'grant'))

const loading = ref(false)
const targetProfile = ref<'1' | '2'>('1')

interface GrantForm {
  dashboard: boolean
  payments: boolean
  validate: boolean
  specialities: { list: boolean, create: boolean, update: boolean, delete: boolean }
  praticiens: { list: boolean, create: boolean, update: boolean, delete: boolean }
  verify: { list: boolean, check: boolean, create: boolean }
  users: { list: boolean, create: boolean, update: boolean, delete: boolean, grant: boolean }
  log: boolean
  statistics_payment: boolean
  chiffre: boolean
}

const form = ref<GrantForm>({
  dashboard: false,
  payments: false,
  validate: false,
  specialities: { list: false, create: false, update: false, delete: false },
  praticiens: { list: false, create: false, update: false, delete: false },
  verify: { list: false, check: false, create: false },
  users: { list: false, create: false, update: false, delete: false, grant: false },
  log: false,
  statistics_payment: false,
  chiffre: false,
})

async function loadGrants() {
  loading.value = true
  try {
    const { data } = await $axios.get('/users/grant', {
      params: { id: route.params.id },
    })
    form.value = JSON.parse(JSON.stringify(data.grant))
    targetProfile.value = data.profile
  }
  catch {
    toast.error('Erreur lors du chargement des droits')
  }
  finally {
    loading.value = false
  }
}

async function save() {
  loading.value = true
  try {
    await $axios.post('/users/grant', {
      id: route.params.id,
      grant: form.value,
    })
    toast.success('Opération effectuée')
  }
  catch {
    toast.error('Erreur lors de l\'enregistrement')
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  if (hasAccess.value) {
    loadGrants()
  }
})
</script>

<template>
  <ClientOnly>
    <div>
      <div v-if="hasAccess">
        <div class="mb-6">
          <Button variant="ghost" size="sm" @click="router.push('/users')">
            <ArrowLeft class="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-6">
          <h3 class="text-lg font-semibold mb-6">
            Définition des droits
          </h3>

          <div v-if="loading" class="text-sm text-muted-foreground py-8 text-center">
            Chargement...
          </div>

          <div v-else>
            <div class="flex flex-wrap gap-4 mb-6">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="grant-dashboard"
                  :disabled="targetProfile === '2'"
                  :checked="form.dashboard"
                  @update:checked="form.dashboard = $event"
                />
                <Label for="grant-dashboard" class="cursor-pointer">Tableau de bord</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox
                  id="grant-payments"
                  :disabled="targetProfile === '1'"
                  :checked="form.payments"
                  @update:checked="form.payments = $event"
                />
                <Label for="grant-payments" class="cursor-pointer">Liste des paiements</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox
                  id="grant-validate"
                  :disabled="targetProfile === '1'"
                  :checked="form.validate"
                  @update:checked="form.validate = $event"
                />
                <Label for="grant-validate" class="cursor-pointer">Valider une consultation</Label>
              </div>
            </div>

            <fieldset class="border rounded-lg p-5 mb-6">
              <legend class="text-sm font-medium px-2">
                Module spécialité
              </legend>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-spec-list" :checked="form.specialities.list" @update:checked="form.specialities.list = $event" />
                  <Label for="grant-spec-list" class="cursor-pointer">Liste des spécialités</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-spec-create" :checked="form.specialities.create" @update:checked="form.specialities.create = $event" />
                  <Label for="grant-spec-create" class="cursor-pointer">Ajouter une spécialité</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-spec-update" :checked="form.specialities.update" @update:checked="form.specialities.update = $event" />
                  <Label for="grant-spec-update" class="cursor-pointer">Modifier une spécialité</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-spec-delete" :checked="form.specialities.delete" @update:checked="form.specialities.delete = $event" />
                  <Label for="grant-spec-delete" class="cursor-pointer">Supprimer une spécialité</Label>
                </div>
              </div>
            </fieldset>

            <fieldset class="border rounded-lg p-5 mb-6">
              <legend class="text-sm font-medium px-2">
                Module praticien
              </legend>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-prac-list" :checked="form.praticiens.list" @update:checked="form.praticiens.list = $event" />
                  <Label for="grant-prac-list" class="cursor-pointer">Liste des praticiens</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-prac-create" :checked="form.praticiens.create" @update:checked="form.praticiens.create = $event" />
                  <Label for="grant-prac-create" class="cursor-pointer">Ajouter un praticien</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-prac-update" :checked="form.praticiens.update" @update:checked="form.praticiens.update = $event" />
                  <Label for="grant-prac-update" class="cursor-pointer">Modifier un praticien</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-prac-delete" :checked="form.praticiens.delete" @update:checked="form.praticiens.delete = $event" />
                  <Label for="grant-prac-delete" class="cursor-pointer">Supprimer un praticien</Label>
                </div>
              </div>
            </fieldset>

            <fieldset class="border rounded-lg p-5 mb-6">
              <legend class="text-sm font-medium px-2">
                Module vérification des paiements
              </legend>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-verif-list" :checked="form.verify.list" @update:checked="form.verify.list = $event" />
                  <Label for="grant-verif-list" class="cursor-pointer">Liste des paiements à vérifier</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-verif-check" :checked="form.verify.check" @update:checked="form.verify.check = $event" />
                  <Label for="grant-verif-check" class="cursor-pointer">Vérifier l'état d'un paiement</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-verif-create" :checked="form.verify.create" @update:checked="form.verify.create = $event" />
                  <Label for="grant-verif-create" class="cursor-pointer">Ajouter un paiement</Label>
                </div>
              </div>
            </fieldset>

            <fieldset class="border rounded-lg p-5 mb-6">
              <legend class="text-sm font-medium px-2">
                Module utilisateur
              </legend>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-user-list" :checked="form.users.list" @update:checked="form.users.list = $event" />
                  <Label for="grant-user-list" class="cursor-pointer">Liste des utilisateurs</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-user-create" :checked="form.users.create" @update:checked="form.users.create = $event" />
                  <Label for="grant-user-create" class="cursor-pointer">Ajouter un utilisateur</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-user-update" :checked="form.users.update" @update:checked="form.users.update = $event" />
                  <Label for="grant-user-update" class="cursor-pointer">Modifier un utilisateur</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-user-delete" :checked="form.users.delete" @update:checked="form.users.delete = $event" />
                  <Label for="grant-user-delete" class="cursor-pointer">Supprimer un utilisateur</Label>
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox id="grant-user-grant" :checked="form.users.grant" @update:checked="form.users.grant = $event" />
                  <Label for="grant-user-grant" class="cursor-pointer">Gestion des droits</Label>
                </div>
              </div>
            </fieldset>

            <div class="flex flex-wrap gap-4 mb-6">
              <div class="flex items-center gap-2">
                <Checkbox id="grant-log" :checked="form.log" @update:checked="form.log = $event" />
                <Label for="grant-log" class="cursor-pointer">Consulter les logs</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="grant-stats-payment" :checked="form.statistics_payment" @update:checked="form.statistics_payment = $event" />
                <Label for="grant-stats-payment" class="cursor-pointer">Statistique paiement</Label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox id="grant-chiffre" :checked="form.chiffre" @update:checked="form.chiffre = $event" />
                <Label for="grant-chiffre" class="cursor-pointer">Statistique sur le chiffre d'affaire</Label>
              </div>
            </div>

            <div class="flex justify-end">
              <Button :disabled="loading" @click="save">
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="hasAccess === false" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-muted-foreground mb-2">
            404
          </h1>
          <p class="text-muted-foreground">
            Page introuvable
          </p>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center h-[60vh]">
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span>Chargement...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
