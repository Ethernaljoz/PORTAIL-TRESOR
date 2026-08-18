<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('info')
</script>

<template>
  <SettingsLayout>
    <div class="space-y-6">
      <Tabs v-model="activeTab" value="info">
        <TabsList>
          <TabsTrigger value="info">
            Informations personnelles
          </TabsTrigger>
          <TabsTrigger value="password">
            Mot de passe
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info" class="mt-6">
          <Card>
            <CardContent class="p-6">
              <SettingsProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password" class="mt-6">
          <Card>
            <CardContent class="p-6">
              <SettingsPasswordForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </SettingsLayout>
</template>
