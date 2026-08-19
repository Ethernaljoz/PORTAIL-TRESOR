<script setup lang="ts">
import {
  ChevronRight,
  Copy,
  Info,
  Loader2,
  Send,
} from 'lucide-vue-next'

import { onMounted, ref } from 'vue'
import { MOCK_ENDPOINTS } from '~/constants/mock-data'

// Données du menu
const menuItems = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'description', label: 'Description' },
  { id: 'endpoint', label: 'Endpoint' },
  { id: 'parameters', label: 'Paramètres' },
  { id: 'headers', label: 'En-têtes' },
  { id: 'example-request', label: 'Exemple de requête' },
  { id: 'responses', label: 'Réponses' },

]

const activeSection = ref('overview')
const testToken = ref('')
const testResult = ref('')
const isLoading = ref(false)

// Paramètres
const parameters = [
  {
    name: 'statut',
    type: 'string',
    required: false,
    description: 'Filtrer les comptes par statut',
    enum: ['actif', 'inactif', 'bloqué'],
  },
  {
    name: 'type',
    type: 'string',
    required: false,
    description: 'Filtrer les comptes par type',
    enum: ['courant', 'épargne', 'professionnel'],
  },
  {
    name: 'page',
    type: 'integer',
    required: false,
    description: 'Numéro de page pour la pagination',
    enum: [],
  },
  {
    name: 'limit',
    type: 'integer',
    required: false,
    description: 'Nombre d\'éléments par page (max 100)',
    enum: [],
  },
]

// En-têtes
const headers = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Token d\'authentification Bearer',
    example: 'Bearer eyJhbGciOiJIUzI1NiIs...',
  },
  {
    name: 'Content-Type',
    type: 'string',
    required: true,
    description: 'Type de contenu de la requête',
    example: 'application/json',
  },
  {
    name: 'Accept-Language',
    type: 'string',
    required: false,
    description: 'Langue préférée pour la réponse',
    example: 'fr-FR',
  },
]

// Codes d'erreur
const errorCodes = [
  {
    code: '401',
    status: '401 Unauthorized',
    description: 'Token d\'authentification manquant ou invalide',
  },
  {
    code: '403',
    status: '403 Forbidden',
    description: 'Accès interdit pour cette structure',
  },
  {
    code: '404',
    status: '404 Not Found',
    description: 'Endpoint non trouvé',
  },
  {
    code: '429',
    status: '429 Too Many Requests',
    description: 'Trop de requêtes, limite de taux dépassée',
  },
  {
    code: '500',
    status: '500 Internal Server Error',
    description: 'Erreur interne du serveur',
  },
]

// Méthodes
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  // Optionnel : ajouter un toast de confirmation
}

function scrollToSection(id: string) {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

async function testEndpoint() {
  isLoading.value = true
  testResult.value = ''

  // Simulation d'appel API
  await new Promise(resolve => setTimeout(resolve, 1500))

  testResult.value = JSON.stringify({
    status: 'success',
    data: {
      comptes: [
        {
          id: 'cpt_123456',
          numero: 'BCEAO00123456',
          intitule: 'Compte courant entreprise',
          type: 'courant',
          solde: 1250000,
          devise: 'XOF',
          statut: 'actif',
          dateCreation: '2025-01-15T10:30:00Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        pages: 1,
      },
    },
  }, null, 2)

  isLoading.value = false
}

// Observer les sections pour le menu actif
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 },
  )

  menuItems.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element)
      observer.observe(element)
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- En-tête avec le titre de l'API -->
      <div class="mb-6">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>API Business</span>
          <ChevronRight class="h-4 w-4" />
          <span class="text-gray-900 font-medium">comptesLister</span>
        </div>
      </div>

      <!-- Section principale -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar gauche -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <div class="mb-4">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Sommaire
              </h3>
            </div>
            <nav class="space-y-1">
              <a
                v-for="item in menuItems" :key="item.id" :href="`#${item.id}`"
                class="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                :class="activeSection === item.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600'"
                @click="scrollToSection(item.id)"
              >
                {{ item.label }}
              </a>
            </nav>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Titre et méthode -->
          <div id="overview" class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-start justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  comptesLister
                </h1>
                <p class="text-gray-500 mt-1">
                  Liste des comptes bancaires d'une structure
                </p>
              </div>
              <Badge class="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-sm">
                GET
              </Badge>
            </div>
          </div>

          <!-- Description -->
          <div id="description" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <div class="prose prose-sm max-w-none text-gray-600">
              <p>
                Cette opération permet de lister l'ensemble des comptes bancaires
                associés à une structure. Les comptes sont retournés avec leurs
                caractéristiques principales : numéro de compte, intitulé, type,
                solde, devise et statut.
              </p>
              <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="flex items-start gap-2">
                  <Info class="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p class="text-sm text-blue-800">
                      <strong>Note :</strong> Cette endpoint est disponible dans
                      l'environnement sandbox pour les tests d'intégration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- URL de l'endpoint -->
          <!-- <div class="bg-white rounded-lg shadow-sm p-6" id="endpoint">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              URL de l'endpoint
            </h2>
            <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
              <code class="text-gray-100 font-mono text-sm">
                GET /v1/business/comptes
              </code>
              <Button
                variant="ghost"
                size="sm"
                class="text-gray-400 hover:text-white"
                @click="copyToClipboard('https://api.pispi.bceao.int/v1/business/comptes')"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              URL complète : <span class="font-mono">https://api.pispi.bceao.int/v1/business/comptes</span>
            </p>
          </div> -->

          <!-- Paramètres de requête -->
          <div id="parameters" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Paramètres de requête
            </h2>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-1/5">
                      Paramètre
                    </TableHead>
                    <TableHead class="w-1/5">
                      Type
                    </TableHead>
                    <TableHead class="w-1/5">
                      Obligatoire
                    </TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="param in parameters" :key="param.name">
                    <TableCell class="font-mono text-sm">
                      {{ param.name }}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {{ param.type }}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        :variant="param.required ? 'default' : 'outline'"
                        :class="param.required ? 'bg-red-100 text-red-700 border-red-200' : ''"
                      >
                        {{ param.required ? 'Oui' : 'Non' }}
                      </Badge>
                    </TableCell>
                    <TableCell class="text-sm text-gray-600">
                      {{ param.description }}
                      <span v-if="param.enum" class="text-gray-400 text-xs block mt-1">
                        Valeurs possibles : {{ param.enum.join(', ') }}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <!-- En-têtes HTTP -->
          <div id="headers" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              En-têtes HTTP
            </h2>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-1/5">
                      Nom
                    </TableHead>
                    <TableHead class="w-1/5">
                      Type
                    </TableHead>
                    <TableHead class="w-1/5">
                      Obligatoire
                    </TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="header in headers" :key="header.name">
                    <TableCell class="font-mono text-sm">
                      {{ header.name }}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {{ header.type }}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        :variant="header.required ? 'default' : 'outline'"
                        :class="header.required ? 'bg-red-100 text-red-700 border-red-200' : ''"
                      >
                        {{ header.required ? 'Oui' : 'Non' }}
                      </Badge>
                    </TableCell>
                    <TableCell class="text-sm text-gray-600">
                      {{ header.description }}
                      <span v-if="header.example" class="text-gray-400 text-xs block mt-1">
                        Exemple : {{ header.example }}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <!-- Exemple de requête -->
          <div id="example-request" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Exemple de requête
            </h2>
            <Tabs default-value="curl" class="w-full">
              <TabsList class="border-b bg-gray-50 rounded-t-lg">
                <TabsTrigger value="curl">
                  cURL
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curl" class="p-4 bg-gray-900 rounded-b-lg">
                <pre class="text-gray-100 text-sm overflow-x-auto"><code>curl -X GET "https://api.pispi.bceao.int/v1/business/comptes?statut=actif&page=1&limit=10" \
  -H "Authorization: Bearer {{ votre_token }}" \
  -H "Content-Type: application/json"</code></pre>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Réponses -->
          <div id="responses" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Réponses
            </h2>

            <!-- Réponse 200 -->
            <div class="mb-6">
              <!-- <div class="flex items-center gap-2 mb-3">
                <Badge class="bg-green-100 text-green-700 border-green-200">
                  200 OK
                </Badge>
                <span class="text-sm text-gray-500">Succès</span>
              </div> -->
              <Tabs default-value="status-200" class="w-full">
                <TabsList class="border-b bg-gray-50 rounded-t-lg">
                  <TabsTrigger
                    value="status-200" class="text-green-500 bg-green-500/20
                  "
                  >
                    200
                  </TabsTrigger>
                  <TabsTrigger value="status-401" class="text-red-500 bg-red-500/20 active:bg-red-500/20">
                    401
                  </TabsTrigger>
                  <TabsTrigger value="status-429" class="text-white bg-red-500/20 active:bg-red-500/20">
                    429
                  </TabsTrigger>
                  <TabsTrigger value="status-503" class="text-white bg-red-500/20 active:bg-red-500/20">
                    503
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="status-200" class="p-4 border border-t-0 bg-muted rounded-lg">
                  <pre class="text-sm font-mono text-foreground overflow-x-auto">
                    <code>
{
  "status": "success",
  "data": {
    "comptes": [
      {
        "id": "12345",
        "numero": "BF001 2345 6789 0123",
        "titulaire": "Jean Dupont",
        "solde": 150000.00,
        "devise": "XOF",
        "statut": "actif",
        "date_creation": "2025-06-15"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3
    }
  }
}
                    </code>
                  </pre>
                </TabsContent>

                <TabsContent value="status-401" class="p-4 border border-t-0 bg-muted rounded-lg">
                  <pre class="text-sm font-mono text-foreground overflow-x-auto">
                    <code>
{
  "status": "error",
  "message": "Token invalide",
  "error": "Invalid token"
}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="status-429" class="p-4 border border-t-0 bg-muted rounded-lg">
                  <pre class="text-sm font-mono text-foreground overflow-x-auto">
                    <code>
{
  "status": "error",
  "message": "Trop de requêtes",
  "error": "Too many requests"
}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="status-503" class="p-4 border border-t-0 bg-muted rounded-lg ">
                  <pre class="text-sm font-mono text-foreground overflow-x-auto">
                    <code>
{
  "status": "error",
  "message": "Service temporairement indisponible",
  "error": "Service unavailable"
}
                    </code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose p {
  margin-bottom: 0.75rem;
}

.prose strong {
  color: #1e293b;
}
</style>
