<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useProfile } from '~/composables/useProfile'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const { user } = useAuth()
const { updateProfile } = useProfile()
const loading = ref(false)

const profileFormSchema = toTypedSchema(z.object({
  last_name: z.string().min(1, 'Le nom est requis.'),
  first_name: z.string().min(1, 'Le prénom est requis.'),
  email: z.string().email('L\'email doit être valide.'),
  phone: z.string().min(1, 'Le téléphone est requis.'),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    last_name: user.value?.last_name ?? '',
    first_name: user.value?.first_name ?? '',
    email: user.value?.email ?? '',
    phone: user.value?.phone ?? '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  if (!user.value?.id) return
  loading.value = true
  try {
    await updateProfile({ id: user.value.id, ...values })
    toast('Profil mis à jour', { description: 'Vos informations ont été enregistrées avec succès.' })
  }
  catch (err: any) {
    const errors = err.response?.data?.errors
    if (errors) {
      const messages = Object.values(errors).flat()
      toast.error('Erreur', { description: messages.join(', ') })
    }
    else {
      toast.error('Erreur', { description: 'Impossible de mettre à jour le profil.' })
    }
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Informations personnelles
    </h3>
    <p class="text-sm text-muted-foreground">
      Mettez à jour vos informations personnelles.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="last_name">
      <FormItem>
        <FormLabel>Nom</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Votre nom" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="first_name">
      <FormItem>
        <FormLabel>Prénom</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Votre prénom" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="votre@email.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Téléphone</FormLabel>
        <FormControl>
          <Input type="tel" placeholder="Votre numéro de téléphone" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit" :disabled="loading">
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </Button>
      <Button type="button" variant="outline" @click="resetForm">
        Réinitialiser
      </Button>
    </div>
  </form>
</template>
