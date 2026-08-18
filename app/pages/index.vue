<script setup lang="ts">
definePageMeta({
  middleware: [
    function () {
      const { isAuthenticated } = useAuth()
      if (isAuthenticated.value) {
        return navigateTo('/dashboard')
      }
      return navigateTo('/portal')
    },
  ],
})
</script>

<template>
  <div />
</template>
