<script setup lang="ts">
import type { Payment } from '~/types/payment'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { usePayments } from '~/composables/usePayments'

const props = defineProps<Props>()

const { types, typeSpecialities, praticiens, loadTypes, onTypeChange, loadPraticiens, identifyCustomer, validatePayment } = usePayments()

interface Props {
  consultation?: Payment | null
}

const open = defineModel<boolean>('open')

const loadingCustomer = ref(false)

const formSchema = toTypedSchema(z.object({
  code: z.string().min(1, 'Code requis'),
  phone: z.string().min(1, 'Numéro de téléphone requis'),
  last_name: z.string().optional().default(''),
  first_name: z.string().optional().default(''),
  type: z.string().min(1, 'Type de spécialité requis'),
  speciality_id: z.string().min(1, 'Spécialité requise'),
  praticien_id: z.string().optional().default(''),
  praticien: z.string().optional().default(''),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    code: '',
    phone: '',
    last_name: '',
    first_name: '',
    type: '',
    speciality_id: '',
    praticien_id: '',
    praticien: '',
  },
})

watch(() => props.consultation, (val) => {
  if (val) {
    form.setValues({
      code: val.code || '',
      phone: val.phone || '',
      last_name: '',
      first_name: '',
      type: '',
      speciality_id: '',
      praticien_id: '',
      praticien: '',
    })
  }
}, { immediate: true })

watch(open, async (val) => {
  if (val) {
    await loadTypes()
  }
})

const isIdentifying = ref(false)
let identifyTimeout: ReturnType<typeof setTimeout> | null = null

async function handleIdentify() {
  const phone = form.values.phone
  if (!phone || phone.length < 8)
    return
  const consultation = props.consultation
  if (!consultation?.service)
    return
  isIdentifying.value = true
  try {
    const result = await identifyCustomer(phone, consultation.service)
    if (result.last_name || result.first_name) {
      form.setFieldValue('last_name', result.last_name || '')
      form.setFieldValue('first_name', result.first_name || '')
    }
  }
  catch {
  }
  finally {
    isIdentifying.value = false
  }
}

function onPhoneChange(value: string) {
  form.setFieldValue('phone', value)
  form.setFieldValue('last_name', '')
  form.setFieldValue('first_name', '')
  if (identifyTimeout)
    clearTimeout(identifyTimeout)
  identifyTimeout = setTimeout(handleIdentify, 500)
}

async function onTypeSelect(value: string) {
  form.setFieldValue('type', value)
  form.setFieldValue('speciality_id', '')
  form.setFieldValue('praticien_id', '')
  form.setFieldValue('praticien', '')
  praticiens.value = []
  onTypeChange(value)
}

async function onSpecialitySelect(value: string) {
  form.setFieldValue('speciality_id', value)
  form.setFieldValue('praticien_id', '')
  form.setFieldValue('praticien', '')
  if (value) {
    await loadPraticiens(value)
  }
}

function onPraticienSelect(value: string) {
  form.setFieldValue('praticien_id', value)
  const found = praticiens.value.find(p => String(p.id) === value)
  form.setFieldValue('praticien', found?.name || '')
}

const isEditing = computed(() => !!props.consultation)

const onSubmit = form.handleSubmit(async (values) => {
  if (!props.consultation)
    return
  try {
    await validatePayment({
      id: props.consultation.id,
      code: values.code,
      phone: values.phone,
      last_name: values.last_name || '',
      first_name: values.first_name || '',
      type: values.type,
      speciality_id: values.speciality_id,
      praticien_id: values.praticien_id,
      praticien: values.praticien,
    })
    toast('Consultation validée', { description: `Le paiement ${values.code} a été validé avec succès.` })
    open.value = false
  }
  catch (err: any) {
    if (err.response?.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat()
      toast.error('Erreur de validation', { description: messages.join(', ') })
    }
    else {
      toast.error('Erreur', { description: 'Une erreur est survenue lors de la validation.' })
    }
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[500px]">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Valider une consultation</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour valider la consultation.
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="code">
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input v-bind="componentField" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <div class="relative">
                  <Input v-bind="componentField" @input="onPhoneChange(($event.target as HTMLInputElement).value)" />
                  <span v-if="isIdentifying"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    Identification...
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="last_name">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Nom du patient" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="first_name">
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Prénom du patient" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ value, handleChange }" name="type">
            <FormItem>
              <FormLabel>Type de spécialité</FormLabel>
              <Select :model-value="value" @update:model-value="(v) => { handleChange(v); onTypeSelect(v) }">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="t in types" :key="t.id" :value="String(t.id)">
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
              <Select :model-value="value" :disabled="!typeSpecialities.length"
                @update:model-value="(v) => { handleChange(v); onSpecialitySelect(v) }">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      :placeholder="typeSpecialities.length ? 'Sélectionnez une spécialité' : 'Sélectionnez d\'abord un type'" />
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
              <Select :model-value="value" :disabled="!praticiens.length"
                @update:model-value="(v) => { handleChange(v); onPraticienSelect(v) }">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      :placeholder="praticiens.length ? 'Sélectionnez un praticien' : 'Sélectionnez d\'abord une spécialité'" />
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
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="open = false">
            Annuler
          </Button>
          <Button type="submit">
            Valider
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
