<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const appearanceFormSchema = toTypedSchema(z.object({
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: appearanceFormSchema,
  initialValues: {
    font: 'inter',
  },
})

const onSubmit = handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Appearance
    </h3>
    <p class="text-sm text-muted-foreground">
      Personnalisez l'apparence de l'application.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ value, handleChange }" name="font">
      <FormItem>
        <FormLabel>Font</FormLabel>
        <Select :model-value="value" @update:model-value="(v) => handleChange(v)">
          <FormControl>
            <SelectTrigger class="w-[200px]">
              <SelectValue placeholder="Inter" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="inter">
              Inter
            </SelectItem>
            <SelectItem value="manrope">
              Manrope
            </SelectItem>
            <SelectItem value="system">
              System
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          Set the font you want to use in the dashboard.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>



    <div class="flex justify-start">
      <Button type="submit">
        Update preferences
      </Button>
    </div>
  </form>
</template>
