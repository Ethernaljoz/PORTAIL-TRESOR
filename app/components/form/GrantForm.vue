<script setup lang="ts">
import type { UserListItem } from '~/composables/useUsers'
import { toast } from 'vue-sonner'

interface Props {
  user: UserListItem | null
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { $axios } = useNuxtApp()

const loading = ref(true)
const error = ref(false)
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

const initialForm: GrantForm = {
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
}

const form = ref<GrantForm>({ ...initialForm })

function mergeGrantData(api: Record<string, any>): GrantForm {
  return {
    dashboard: !!api.dashboard,
    payments: !!api.payments,
    validate: !!api.validate,
    specialities: {
      list: !!api.specialities?.list,
      create: !!api.specialities?.create,
      update: !!api.specialities?.update,
      delete: !!api.specialities?.delete,
    },
    praticiens: {
      list: !!api.praticiens?.list,
      create: !!api.praticiens?.create,
      update: !!api.praticiens?.update,
      delete: !!api.praticiens?.delete,
    },
    verify: {
      list: !!api.verify?.list,
      check: !!api.verify?.check,
      create: !!api.verify?.create,
    },
    users: {
      list: !!api.users?.list,
      create: !!api.users?.create,
      update: !!api.users?.update,
      delete: !!api.users?.delete,
      grant: !!api.users?.grant,
    },
    log: !!api.log,
    statistics_payment: !!api.statistics_payment,
    chiffre: !!api.chiffre,
  }
}

async function loadGrants() {
  if (!props.user) return
  try {
    const { data } = await $axios.get('/users/grant', {
      params: { id: props.user.id },
    })
    form.value = mergeGrantData(data.grant ?? data)
    targetProfile.value = String(data.profile) as '1' | '2'
  }
  catch {
    error.value = true
    toast.error('Erreur lors du chargement des droits')
  }
}

async function save() {
  if (!props.user) return
  loading.value = true
  try {
    await $axios.post('/users/grant', {
      id: props.user.id,
      grant: form.value,
    })
    toast.success('Opération effectuée')
    emit('update:open', false)
  }
  catch {
    toast.error('Erreur lors de l\'enregistrement')
  }
  finally {
    loading.value = false
  }
}

function resetForm() {
  form.value = { ...initialForm }
  targetProfile.value = '1'
  error.value = false
}

watch(() => props.open, (val) => {
  if (val && props.user) {
    loading.value = true
    error.value = false
    loadGrants().finally(() => { loading.value = false })
  }
  else {
    resetForm()
    loading.value = true
  }
})
</script>

<template>
  <Dialog :open="props.open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Droits — {{ props.user?.last_name }} {{ props.user?.first_name }}</DialogTitle>
        <DialogDescription>
          {{ props.user?.email }} · {{ props.user?.profile === '2' ? 'Administrateur' : 'Agent' }}
        </DialogDescription>
      </DialogHeader>

      <div v-if="loading" class="text-sm text-muted-foreground py-8 text-center">
        Chargement...
      </div>

      <div v-else class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-dashboard'"
              :checked="form.dashboard"
              :disabled="targetProfile === '2'"
              class="size-4 accent-primary rounded border-border disabled:opacity-50 disabled:cursor-not-allowed"
              @change="form.dashboard = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-dashboard'" class="text-sm cursor-pointer">Tableau de bord</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-payments'"
              :checked="form.payments"
              :disabled="targetProfile === '1'"
              class="size-4 accent-primary rounded border-border disabled:opacity-50 disabled:cursor-not-allowed"
              @change="form.payments = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-payments'" class="text-sm cursor-pointer">Liste des paiements</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-validate'"
              :checked="form.validate"
              :disabled="targetProfile === '1'"
              class="size-4 accent-primary rounded border-border disabled:opacity-50 disabled:cursor-not-allowed"
              @change="form.validate = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-validate'" class="text-sm cursor-pointer">Valider une consultation</label>
          </div>
        </div>

        <fieldset class="border rounded-lg p-4">
          <legend class="text-sm font-medium px-2">Module spécialité</legend>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2" v-for="(_, key) in form.specialities" :key="key">
              <input
                type="checkbox"
                :id="'grant-spec-' + key"
                :checked="form.specialities[key as keyof typeof form.specialities]"
                class="size-4 accent-primary rounded border-border"
                @change="(form.specialities as any)[key] = ($event.target as HTMLInputElement).checked"
              />
              <label :for="'grant-spec-' + key" class="text-sm cursor-pointer capitalize">{{ key === 'list' ? 'Liste des spécialités' : key === 'create' ? 'Ajouter une spécialité' : key === 'update' ? 'Modifier une spécialité' : 'Supprimer une spécialité' }}</label>
            </div>
          </div>
        </fieldset>

        <fieldset class="border rounded-lg p-4">
          <legend class="text-sm font-medium px-2">Module praticien</legend>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2" v-for="(_, key) in form.praticiens" :key="key">
              <input
                type="checkbox"
                :id="'grant-prac-' + key"
                :checked="form.praticiens[key as keyof typeof form.praticiens]"
                class="size-4 accent-primary rounded border-border"
                @change="(form.praticiens as any)[key] = ($event.target as HTMLInputElement).checked"
              />
              <label :for="'grant-prac-' + key" class="text-sm cursor-pointer capitalize">{{ key === 'list' ? 'Liste des praticiens' : key === 'create' ? 'Ajouter un praticien' : key === 'update' ? 'Modifier un praticien' : 'Supprimer un praticien' }}</label>
            </div>
          </div>
        </fieldset>

        <fieldset class="border rounded-lg p-4">
          <legend class="text-sm font-medium px-2">Module vérification des paiements</legend>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2" v-for="(_, key) in form.verify" :key="key">
              <input
                type="checkbox"
                :id="'grant-verif-' + key"
                :checked="form.verify[key as keyof typeof form.verify]"
                class="size-4 accent-primary rounded border-border"
                @change="(form.verify as any)[key] = ($event.target as HTMLInputElement).checked"
              />
              <label :for="'grant-verif-' + key" class="text-sm cursor-pointer capitalize">{{ key === 'list' ? 'Liste des paiements à vérifier' : key === 'check' ? "Vérifier l'état d'un paiement" : 'Ajouter un paiement' }}</label>
            </div>
          </div>
        </fieldset>

        <fieldset class="border rounded-lg p-4">
          <legend class="text-sm font-medium px-2">Module utilisateur</legend>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2" v-for="(_, key) in form.users" :key="key">
              <input
                type="checkbox"
                :id="'grant-user-' + key"
                :checked="form.users[key as keyof typeof form.users]"
                class="size-4 accent-primary rounded border-border"
                @change="(form.users as any)[key] = ($event.target as HTMLInputElement).checked"
              />
              <label :for="'grant-user-' + key" class="text-sm cursor-pointer capitalize">{{ key === 'list' ? 'Liste des utilisateurs' : key === 'create' ? 'Ajouter un utilisateur' : key === 'update' ? 'Modifier un utilisateur' : key === 'delete' ? 'Supprimer un utilisateur' : 'Gestion des droits' }}</label>
            </div>
          </div>
        </fieldset>

        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-log'"
              :checked="form.log"
              class="size-4 accent-primary rounded border-border"
              @change="form.log = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-log'" class="text-sm cursor-pointer">Consulter les logs</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-stats-payment'"
              :checked="form.statistics_payment"
              class="size-4 accent-primary rounded border-border"
              @change="form.statistics_payment = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-stats-payment'" class="text-sm cursor-pointer">Statistique paiement</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              :id="'grant-chiffre'"
              :checked="form.chiffre"
              class="size-4 accent-primary rounded border-border"
              @change="form.chiffre = ($event.target as HTMLInputElement).checked"
            />
            <label :for="'grant-chiffre'" class="text-sm cursor-pointer">Statistique sur le chiffre d'affaire</label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" @click="emit('update:open', false)">
          Annuler
        </Button>
        <Button :disabled="loading" @click="save">
          Enregistrer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
