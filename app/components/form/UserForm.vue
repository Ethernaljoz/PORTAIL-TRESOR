<script setup lang="ts">
import type { UserListItem } from '~/composables/useUsers'
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
import { useUsers } from '~/composables/useUsers'

const props = defineProps<Props>()

const { createUser, updateUser } = useUsers()

interface Props {
  user?: UserListItem | null
}

const open = defineModel<boolean>('open')

const isEditing = computed(() => !!props.user)

const formSchema = toTypedSchema(z.object({
  first_name: z.string().min(1, 'Le prénom est requis'),
  last_name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('L\'email doit être valide'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  profile: z.string().min(1, 'Le profil est requis'),
  password: z.string().optional().default(''),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    profile: '',
    password: '',
  },
})

watch(() => props.user, (val) => {
  if (val) {
    form.setValues({
      first_name: val.first_name || '',
      last_name: val.last_name || '',
      email: val.email || '',
      phone: val.phone || '',
      profile: val.profile || '',
      password: '',
    })
  }
  else {
    form.resetForm()
  }
}, { immediate: true })

const onSubmit = form.handleSubmit(async (values) => {
  try {
    if (isEditing.value && props.user) {
      await updateUser({
        id: props.user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        profile: values.profile,
      })
      toast('Utilisateur modifié', { description: 'L\'utilisateur a été mis à jour avec succès.' })
    }
    else {
      await createUser({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        profile: values.profile,
        password: values.password,
      })
      toast('Utilisateur créé', { description: 'Le nouvel utilisateur a été ajouté avec succès.' })
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
          <DialogTitle>{{ isEditing ? 'Modifier' : 'Nouvel' }} utilisateur</DialogTitle>
          <DialogDescription>
            {{ isEditing ? 'Modifiez les informations de l\'utilisateur.' : 'Remplissez le formulaire pour créer un nouvel utilisateur.' }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="first_name">
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Jean" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="last_name">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Dupont" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="email" placeholder="jean.dupont@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="tel" placeholder="+229 XX XX XX XX" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="profile">
            <FormItem>
              <FormLabel>Profil</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Sélectionnez un profil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    Agent
                  </SelectItem>
                  <SelectItem value="2">
                    Administrateur
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-if="!isEditing" v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="password" placeholder="Minimum 6 caractères" />
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
