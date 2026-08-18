<script setup lang="ts">
import type { Payment } from '~/types/payment'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { usePayments } from '~/composables/usePayments'

const props = defineProps<{
  payment: Payment | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { typeSpecialities, praticiens, agents, editPayment, loadTypes, loadAgents, onTypeChange, loadPraticiens } = usePayments()

const typeOptions = [
  { id: 1, name: 'Consultation en chirurgie externe' },
  { id: 2, name: 'Consultation en medecine externe' },
  { id: 3, name: 'Autres types de consultation' },
]

const saving = ref(false)
const loaded = ref(false)

const schema = toTypedSchema(
  z.object({
    first_name: z.string().min(1, 'Prénom requis'),
    last_name: z.string().min(1, 'Nom requis'),
    type: z.string().min(1, 'Type de spécialité requis'),
    speciality_id: z.string().min(1, 'Spécialité requise'),
    praticien_id: z.string().min(1, 'Praticien requis'),
    user_id: z.string().min(1, 'Agent requis'),
  }),
)

const form = useForm({
  validationSchema: schema,
})

async function populateFromPayment(p: Payment) {
  form.setFieldValue('first_name', p.first_name ?? '')
  form.setFieldValue('last_name', p.last_name ?? '')
  form.setFieldValue('type', String(p.type_speciality_id ?? ''))
  form.setFieldValue('speciality_id', String(p.speciality_id ?? ''))
  form.setFieldValue('praticien_id', String(p.praticien_id ?? ''))
  form.setFieldValue('user_id', String(p.user_id ?? ''))
  if (p.type_speciality_id) {
    onTypeChange(p.type_speciality_id)
  }
  if (p.speciality_id) {
    await loadPraticiens(p.speciality_id)
  }
}

watch(() => props.payment, async (p) => {
  if (!p || !loaded.value)
    return
  await populateFromPayment(p)
}, { immediate: false })

onMounted(async () => {
  await Promise.all([loadTypes(), loadAgents()])
  loaded.value = true
  if (props.payment) {
    await populateFromPayment(props.payment)
  }
})

function onTypeSelected(val: string, handleChange: (v: any) => void) {
  handleChange(val)
  form.setFieldValue('speciality_id', '')
  form.setFieldValue('praticien_id', '')
  onTypeChange(val)
}

function onSpecialitySelected(val: string, handleChange: (v: any) => void) {
  handleChange(val)
  form.setFieldValue('praticien_id', '')
  if (val) {
    loadPraticiens(val)
  }
}

const onSubmit = form.handleSubmit(async (values) => {
  if (!props.payment)
    return
  saving.value = true
  try {
    const praticienName = praticiens.value.find((p: any) => p.id === Number(values.praticien_id))?.name || ''
    await editPayment({
      id: props.payment.id,
      first_name: values.first_name,
      last_name: values.last_name,
      type_speciality_id: values.type,
      speciality_id: values.speciality_id,
      praticien_id: values.praticien_id,
      praticien: praticienName,
      user_id: values.user_id,
    })
    toast('Paiement modifié', { description: 'La consultation a été modifiée avec succès.' })
    emit('close')
  }
  catch (err: any) {
    const errors = err.response?.data?.errors
    if (errors) {
      const messages = Object.values(errors).flat()
      toast.error('Erreur', { description: messages.join(', ') })
    }
    else {
      toast.error('Erreur', { description: 'Impossible de modifier la consultation.' })
    }
  }
  finally {
    saving.value = false
  }
})
</script>

<template>
  <Dialog :open="!!payment" @update:open="val => { if (!val) emit('close') }">
    <DialogContent class="sm:max-w-[500px]">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Modifier la consultation</DialogTitle>
          <DialogDescription>Modifiez les informations de la consultation.</DialogDescription>
        </DialogHeader>

        <div class="space-y-4 py-4 -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <div v-if="payment" class="rounded-lg bg-muted p-3 text-sm space-y-1">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Code</span>
              <span class="font-mono font-semibold">{{ payment.code }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Montant</span>
              <span class="font-semibold">{{ payment.amount.toLocaleString('fr-FR') }} Fcfa</span>
            </div>
          </div>

          <FormField v-slot="{ componentField }" name="last_name">
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Nom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="first_name">
            <FormItem>
              <FormLabel>Prénoms</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Prénoms" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="type">
            <FormItem>
              <FormLabel>Type de spécialité</FormLabel>
              <Select :model-value="value" @update:model-value="(v: string) => onTypeSelected(v, handleChange)">
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="t in typeOptions" :key="t.id" :value="String(t.id)">
                    {{ t.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="speciality_id">
            <FormItem>
              <FormLabel>Spécialité</FormLabel>
              <Select
                :model-value="value" :disabled="!typeSpecialities.length"
                @update:model-value="(v: string) => onSpecialitySelected(v, handleChange)"
              >
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue
                      :placeholder="typeSpecialities.length ? 'Sélectionnez une spécialité' : 'Sélectionnez d\'abord un type'"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="s in typeSpecialities" :key="s.id" :value="String(s.id)">
                    {{ s.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="praticien_id">
            <FormItem>
              <FormLabel>Praticien</FormLabel>
              <Select
                :model-value="value" :disabled="!praticiens.length"
                @update:model-value="(v: string) => { handleChange(v) }"
              >
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue
                      :placeholder="praticiens.length ? 'Sélectionnez un praticien' : 'Sélectionnez d\'abord une spécialité'"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="p in praticiens" :key="p.id" :value="String(p.id)">
                    {{ p.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="user_id">
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <Select :model-value="value" @update:model-value="handleChange">
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Sélectionnez un agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="a in agents" :key="a.id" :value="String(a.id)">
                    {{ a.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter class="gap-2">
          <Button type="button" variant="outline" @click="emit('close')">
            Annuler
          </Button>
          <Button type="submit" :disabled="saving">
            {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
