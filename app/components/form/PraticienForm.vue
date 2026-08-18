<script setup lang="ts">
import type { Praticien } from '~/composables/usePraticiens'
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
import { usePraticiens } from '~/composables/usePraticiens'

const props = defineProps<Props>()

const { createPraticien, updatePraticien } = usePraticiens()

interface Props {
  praticien?: Praticien | null
}

const open = defineModel<boolean>('open')

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(8, 'Le numéro de téléphone doit contenir au moins 8 chiffres'),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    phone: '',
  },
})

watch(() => props.praticien, (val) => {
  if (val) {
    form.setValues({
      name: val.name || '',
      phone: val.phone || '',
    })
  }
  else {
    form.resetForm()
  }
}, { immediate: true })

const isEditing = computed(() => !!props.praticien)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const payload = {
      ...(isEditing.value ? { id: props.praticien!.id } : {}),
      name: values.name,
      phone: values.phone,
    }
    if (isEditing.value) {
      await updatePraticien(payload)
      toast('Praticien modifié', { description: 'Le praticien a été mis à jour avec succès.' })
    }
    else {
      await createPraticien(payload)
      toast('Praticien créé', { description: 'Le nouveau praticien a été ajouté avec succès.' })
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
          <DialogTitle>{{ isEditing ? 'Modifier' : 'Nouveau' }} praticien</DialogTitle>
          <DialogDescription>
            {{ isEditing ? 'Modifiez les informations du praticien.' : 'Remplissez le formulaire pour ajouter un nouveau praticien.' }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: Dr. Jean Dupont" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="tel" placeholder="Ex: 97000000" />
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
