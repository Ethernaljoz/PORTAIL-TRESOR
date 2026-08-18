<script setup lang="ts">
import type { Speciality } from '~/composables/useSpecialities'
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
import { useSpecialities } from '~/composables/useSpecialities'

const props = defineProps<Props>()

const { loadPraticiens, createSpeciality, updateSpeciality, specialityTypes } = useSpecialities()

interface Props {
  speciality?: Speciality | null
}

const open = defineModel<boolean>('open')

const praticiens = ref<{ id: number, name: string }[]>([])
const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1, 'Le nom de la spécialité est requis'),
  type: z.string().min(1, 'Le type est requis'),
  praticien: z.array(z.number()),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    type: '',
    praticien: [] as number[],
  },
})

watch(() => props.speciality, (val) => {
  if (val) {
    form.setValues({
      name: val.name || '',
      type: val.type || '',
      praticien: parsePraticiens(val.praticien),
    })
  }
  else {
    form.resetForm()
  }
}, { immediate: true })

watch(open, async (val) => {
  if (val) {
    loading.value = true
    praticiens.value = await loadPraticiens()
    loading.value = false
  }
})

function parsePraticiens(praticienStr?: string): number[] {
  if (!praticienStr || praticienStr === '')
    return []
  return praticienStr.split(' ').map(Number).filter(Boolean)
}

const isEditing = computed(() => !!props.speciality)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const payload = {
      ...(isEditing.value ? { id: props.speciality!.id } : {}),
      name: values.name,
      type: values.type,
      praticien: values.praticien,
    }
    if (isEditing.value) {
      await updateSpeciality(payload)
      toast('Spécialité modifiée', { description: 'La spécialité a été mise à jour avec succès.' })
    }
    else {
      await createSpeciality(payload)
      toast('Spécialité créée', { description: 'La nouvelle spécialité a été ajoutée avec succès.' })
    }
    open.value = false
  }
  catch (err: any) {
    if (err.response?.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat()
      toast.error('Erreur', { description: messages.join(', ') })
    }
    else {
      toast.error('Erreur', { description: 'Une erreur est survenue.' })
    }
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[500px]">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>{{ isEditing ? 'Modifier' : 'Nouvelle' }} spécialité</DialogTitle>
          <DialogDescription>
            {{ isEditing ? 'Modifiez les informations de la spécialité.' : 'Remplissez le formulaire pour ajouter une nouvelle spécialité.' }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nom de la spécialité</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: Cardiologie" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField, value, handleChange }" name="type">
            <FormItem>
              <FormLabel>Type de spécialité</FormLabel>
              <Select :model-value="value" @update:model-value="handleChange">
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem v-for="t in specialityTypes" :key="t.id" :value="t.id">
                    {{ t.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="praticien">
            <FormItem>
              <FormLabel>Praticien(s)</FormLabel>
              <FormControl>
                <div v-if="loading" class="text-sm text-muted-foreground py-2">
                  Chargement des praticiens...
                </div>
                <div v-else-if="praticiens.length === 0" class="text-sm text-muted-foreground py-2">
                  Aucun praticien disponible.
                </div>
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                  <div v-for="p in praticiens" :key="p.id" class="flex items-center gap-2">
                    <Checkbox
                      :checked="((value as number[]) ?? []).includes(p.id)"
                      @update:checked="(checked) => {
                        const arr = [...((value as number[]) ?? [])]
                        if (checked) arr.push(p.id)
                        else arr.splice(arr.indexOf(p.id), 1)
                        handleChange(arr)
                      }"
                    />
                    <label class="text-sm cursor-pointer">{{ p.name }}</label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="open = false">
            Annuler
          </Button>
          <Button type="submit">
            {{ isEditing ? 'Enregistrer' : 'Créer' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
