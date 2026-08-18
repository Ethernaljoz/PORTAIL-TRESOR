<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useProfile } from '~/composables/useProfile'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const { user } = useAuth()
const { updatePassword } = useProfile()
const loading = ref(false)

const passwordFormSchema = toTypedSchema(z.object({
  ancien_mot_de_passe: z.string().min(1, 'L\'ancien mot de passe est requis.'),
  mot_de_passe: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères.'),
  mot_de_passe_confirmation: z.string().min(1, 'La confirmation est requise.'),
}).refine(data => data.mot_de_passe === data.mot_de_passe_confirmation, {
  message: 'Les mots de passe ne correspondent pas.',
  path: ['mot_de_passe_confirmation'],
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: passwordFormSchema,
})

const onSubmit = handleSubmit(async (values) => {
  if (!user.value?.id) return
  loading.value = true
  try {
    await updatePassword({ id: user.value.id, ...values })
    toast('Mot de passe modifié', { description: 'Votre mot de passe a été mis à jour avec succès.' })
    resetForm()
  }
  catch (err: any) {
    const errors = err.response?.data?.errors
    if (errors) {
      const messages = Object.values(errors).flat()
      toast.error('Erreur', { description: messages.join(', ') })
    }
    else {
      toast.error('Erreur', { description: 'Impossible de modifier le mot de passe.' })
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
      Mot de passe
    </h3>
    <p class="text-sm text-muted-foreground">
      Modifiez votre mot de passe de connexion.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="ancien_mot_de_passe">
      <FormItem>
        <FormLabel>Ancien mot de passe</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Votre ancien mot de passe" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="mot_de_passe">
      <FormItem>
        <FormLabel>Nouveau mot de passe</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Minimum 6 caractères" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="mot_de_passe_confirmation">
      <FormItem>
        <FormLabel>Confirmer le mot de passe</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Répétez le nouveau mot de passe" v-bind="componentField" />
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
