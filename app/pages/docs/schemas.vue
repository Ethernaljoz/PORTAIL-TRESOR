<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const schemas = [
  {
    name: 'Compte',
    description: 'Représente un compte financier.',
    fields: [
      { name: 'id', type: 'string', description: 'Identifiant unique du compte' },
      { name: 'numero', type: 'string', description: 'Numéro de compte formaté' },
      { name: 'titulaire', type: 'string', description: 'Nom du titulaire du compte' },
      { name: 'solde', type: 'number', description: 'Solde disponible en FCFA' },
      { name: 'devise', type: 'string', description: 'Code devise (XOF, XAF, etc.)' },
      { name: 'statut', type: 'enum', description: 'actif | bloque | ferme' },
      { name: 'date_creation', type: 'string (ISO 8601)', description: 'Date de création du compte' },
    ],
  },
  {
    name: 'Transfert',
    description: 'Représente une opération de transfert de fonds.',
    fields: [
      { name: 'id', type: 'string', description: 'Identifiant unique du transfert' },
      { name: 'compte_source', type: 'string', description: 'ID du compte source' },
      { name: 'compte_destination', type: 'string', description: 'ID du compte destination' },
      { name: 'montant', type: 'number', description: 'Montant du transfert en FCFA' },
      { name: 'devise', type: 'string', description: 'Code devise' },
      { name: 'motif', type: 'string', description: 'Motif du transfert' },
      { name: 'statut', type: 'enum', description: 'en_cours | confirme | echoue | annule' },
      { name: 'reference_client', type: 'string', description: 'Référence client optionnelle' },
      { name: 'date_initiation', type: 'string (ISO 8601)', description: 'Date et heure de l\'initiation' },
    ],
  },
  {
    name: 'Opération',
    description: 'Représente une opération financière (crédit ou débit).',
    fields: [
      { name: 'id', type: 'string', description: 'Identifiant unique de l\'opération' },
      { name: 'type', type: 'enum', description: 'credit | debit | virement' },
      { name: 'montant', type: 'number', description: 'Montant (négatif pour les débits)' },
      { name: 'devise', type: 'string', description: 'Code devise' },
      { name: 'description', type: 'string', description: 'Description de l\'opération' },
      { name: 'date', type: 'string (ISO 8601)', description: 'Date de l\'opération' },
      { name: 'solde_apres', type: 'number', description: 'Solde du compte après opération' },
    ],
  },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-foreground">Schémas de données</h1>
      <p class="mt-4 text-muted-foreground leading-relaxed">
        Détaillent la structure des objets utilisés dans les réponses de l'API.
      </p>
    </div>

    <Card v-for="schema in schemas" :key="schema.name">
      <CardContent class="p-6 space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-foreground">{{ schema.name }}</h2>
          <p class="text-sm text-muted-foreground mt-1">{{ schema.description }}</p>
        </div>
        <div class="border border-border rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-muted/50 border-b border-border">
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Champ</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Type</th>
                <th class="text-left py-2 px-4 text-[11px] font-semibold text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="field in schema.fields" :key="field.name" class="hover:bg-muted/30">
                <td class="py-2 px-4 font-mono text-xs font-medium">{{ field.name }}</td>
                <td class="py-2 px-4 text-xs text-muted-foreground">{{ field.type }}</td>
                <td class="py-2 px-4 text-xs text-muted-foreground">{{ field.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
