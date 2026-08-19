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
                v-for="item in menuItems"
                :key="item.id"
                :href="`#${item.id}`"
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
          <div class="bg-white rounded-lg shadow-sm p-6" id="overview">
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
          <div class="bg-white rounded-lg shadow-sm p-6" id="description">
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
          <div class="bg-white rounded-lg shadow-sm p-6" id="endpoint">
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
          </div>

          <!-- Paramètres de requête -->
          <div class="bg-white rounded-lg shadow-sm p-6" id="parameters">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Paramètres de requête
            </h2>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-1/5">Paramètre</TableHead>
                    <TableHead class="w-1/5">Type</TableHead>
                    <TableHead class="w-1/5">Obligatoire</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="param in parameters" :key="param.name">
                    <TableCell class="font-mono text-sm">{{ param.name }}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{{ param.type }}</Badge>
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
          <div class="bg-white rounded-lg shadow-sm p-6" id="headers">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              En-têtes HTTP
            </h2>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-1/5">Nom</TableHead>
                    <TableHead class="w-1/5">Type</TableHead>
                    <TableHead class="w-1/5">Obligatoire</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="header in headers" :key="header.name">
                    <TableCell class="font-mono text-sm">{{ header.name }}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{{ header.type }}</Badge>
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
          <div class="bg-white rounded-lg shadow-sm p-6" id="example-request">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Exemple de requête
            </h2>
            <Tabs default-value="curl" class="w-full">
              <TabsList class="border-b bg-gray-50 rounded-t-lg">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
              </TabsList>
              <TabsContent value="curl" class="p-4 bg-gray-900 rounded-b-lg">
                <pre class="text-gray-100 text-sm overflow-x-auto"><code>curl -X GET "https://api.pispi.bceao.int/v1/business/comptes?statut=actif&page=1&limit=10" \
  -H "Authorization: Bearer {{votre_token}}" \
  -H "Content-Type: application/json"</code></pre>
              </TabsContent>
              <TabsContent value="javascript" class="p-4 bg-gray-900 rounded-b-lg">
                <pre class="text-gray-100 text-sm overflow-x-auto"><code>fetch('https://api.pispi.bceao.int/v1/business/comptes?statut=actif&page=1&limit=10', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer {{votre_token}}',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erreur:', error));</code></pre>
              </TabsContent>
              <TabsContent value="python" class="p-4 bg-gray-900 rounded-b-lg">
                <pre class="text-gray-100 text-sm overflow-x-auto"><code>import requests

url = "https://api.pispi.bceao.int/v1/business/comptes"
headers = {
    "Authorization": "Bearer {{votre_token}}",
    "Content-Type": "application/json"
}
params = {
    "statut": "actif",
    "page": 1,
    "limit": 10
}

response = requests.get(url, headers=headers, params=params)
print(response.json())</code></pre>
              </TabsContent>
              <TabsContent value="php" class="p-4 bg-gray-900 rounded-b-lg">
                <pre class="text-gray-100 text-sm overflow-x-auto"><code>&lt;?php

$url = 'https://api.pispi.bceao.int/v1/business/comptes?statut=actif&page=1&limit=10';
$headers = [
    'Authorization: Bearer {{votre_token}}',
    'Content-Type: application/json'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;</code></pre>
              </TabsContent>
            </Tabs>
          </div>

          <!-- Réponses -->
          <div class="bg-white rounded-lg shadow-sm p-6" id="responses">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Réponses
            </h2>
            
            <!-- Réponse 200 -->
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-3">
                <Badge class="bg-green-100 text-green-700 border-green-200">
                  200 OK
                </Badge>
                <span class="text-sm text-gray-500">Succès</span>
              </div>
              <Tabs default-value="schema" class="w-full">
                <TabsList class="border-b bg-gray-50 rounded-t-lg">
                  <TabsTrigger value="schema">Schéma</TabsTrigger>
                  <TabsTrigger value="example">Exemple</TabsTrigger>
                </TabsList>
                <TabsContent value="schema" class="p-4 border border-t-0 rounded-b-lg">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-start gap-4">
                      <span class="font-mono text-blue-600 w-32">status</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Statut de la réponse</span>
                    </div>
                    <div class="flex items-start gap-4">
                      <span class="font-mono text-blue-600 w-32">data</span>
                      <span class="text-gray-500 w-20">object</span>
                      <span class="text-gray-600">Données de la réponse</span>
                    </div>
                    <div class="flex items-start gap-4 pl-8">
                      <span class="font-mono text-purple-600 w-32">comptes</span>
                      <span class="text-gray-500 w-20">array</span>
                      <span class="text-gray-600">Liste des comptes</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">id</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Identifiant unique</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">numero</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Numéro de compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">intitule</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Intitulé du compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">type</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Type de compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">solde</span>
                      <span class="text-gray-500 w-20">number</span>
                      <span class="text-gray-600">Solde du compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">devise</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Devise du compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">statut</span>
                      <span class="text-gray-500 w-20">string</span>
                      <span class="text-gray-600">Statut du compte</span>
                    </div>
                    <div class="flex items-start gap-4 pl-8">
                      <span class="font-mono text-purple-600 w-32">pagination</span>
                      <span class="text-gray-500 w-20">object</span>
                      <span class="text-gray-600">Informations de pagination</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">page</span>
                      <span class="text-gray-500 w-20">number</span>
                      <span class="text-gray-600">Numéro de page</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">limit</span>
                      <span class="text-gray-500 w-20">number</span>
                      <span class="text-gray-600">Nombre d'éléments par page</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">total</span>
                      <span class="text-gray-500 w-20">number</span>
                      <span class="text-gray-600">Nombre total d'éléments</span>
                    </div>
                    <div class="flex items-start gap-4 pl-16">
                      <span class="font-mono text-purple-600 w-32">pages</span>
                      <span class="text-gray-500 w-20">number</span>
                      <span class="text-gray-600">Nombre total de pages</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="example" class="p-4 border border-t-0 rounded-b-lg">
                  <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{
  "status": "success",
  "data": {
    "comptes": [
      {
        "id": "cpt_123456",
        "numero": "BCEAO00123456",
        "intitule": "Compte courant entreprise",
        "type": "courant",
        "solde": 1250000,
        "devise": "XOF",
        "statut": "actif",
        "dateCreation": "2025-01-15T10:30:00Z"
      },
      {
        "id": "cpt_789012",
        "numero": "BCEAO00789012",
        "intitule": "Compte épargne personnel",
        "type": "épargne",
        "solde": 750000,
        "devise": "XOF",
        "statut": "actif",
        "dateCreation": "2025-02-20T14:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2,
      "pages": 1
    }
  }
}</code></pre>
                </TabsContent>
              </Tabs>
            </div>

            <!-- Réponse 401 -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <Badge class="bg-red-100 text-red-700 border-red-200">
                  401 Unauthorized
                </Badge>
                <span class="text-sm text-gray-500">Non autorisé</span>
              </div>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{
  "status": "error",
  "code": 401,
  "message": "Token d'authentification invalide ou expiré",
  "errors": [
    {
      "field": "Authorization",
      "message": "Bearer token required"
    }
  ]
}</code></pre>
            </div>
          </div>

          <!-- Code d'erreur -->
          <div class="bg-white rounded-lg shadow-sm p-6" id="errors">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Codes d'erreur
            </h2>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="w-1/4">Code</TableHead>
                    <TableHead class="w-1/4">Statut HTTP</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="error in errorCodes" :key="error.code">
                    <TableCell class="font-mono text-sm text-red-600">
                      {{ error.code }}
                    </TableCell>
                    <TableCell>
                      <Badge :variant="error.status.startsWith('4') ? 'destructive' : 'secondary'">
                        {{ error.status }}
                      </Badge>
                    </TableCell>
                    <TableCell class="text-sm text-gray-600">
                      {{ error.description }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <!-- Exemple de code -->
          <div class="bg-white rounded-lg shadow-sm p-6" id="try-it">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Essayez-le
            </h2>
            <div class="space-y-4">
              <div class="flex flex-col gap-3">
                <div class="flex gap-3">
                  <Input
                    v-model="testToken"
                    placeholder="Entrez votre token d'authentification"
                    class="flex-1"
                  />
                  <Button @click="testEndpoint" :disabled="isLoading">
                    <Send class="h-4 w-4 mr-2" />
                    Tester
                  </Button>
                </div>
                <div v-if="testResult" class="bg-gray-900 rounded-lg p-4">
                  <pre class="text-gray-100 text-sm overflow-x-auto">{{ testResult }}</pre>
                </div>
                <div v-if="isLoading" class="flex justify-center py-4">
                  <Loader2 class="h-6 w-6 animate-spin text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ChevronRight,
  Copy,
  Info,
  Send,
  Loader2
} from 'lucide-vue-next'

// Données du menu
const menuItems = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'description', label: 'Description' },
  { id: 'endpoint', label: 'Endpoint' },
  { id: 'parameters', label: 'Paramètres' },
  { id: 'headers', label: 'En-têtes' },
  { id: 'example-request', label: 'Exemple de requête' },
  { id: 'responses', label: 'Réponses' },
  { id: 'errors', label: 'Codes d\'erreur' },
  { id: 'try-it', label: 'Essayez-le' }
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
    enum: ['actif', 'inactif', 'bloqué']
  },
  {
    name: 'type',
    type: 'string',
    required: false,
    description: 'Filtrer les comptes par type',
    enum: ['courant', 'épargne', 'professionnel']
  },
  {
    name: 'page',
    type: 'integer',
    required: false,
    description: 'Numéro de page pour la pagination',
    enum: []
  },
  {
    name: 'limit',
    type: 'integer',
    required: false,
    description: 'Nombre d\'éléments par page (max 100)',
    enum: []
  }
]

// En-têtes
const headers = [
  {
    name: 'Authorization',
    type: 'string',
    required: true,
    description: 'Token d\'authentification Bearer',
    example: 'Bearer eyJhbGciOiJIUzI1NiIs...'
  },
  {
    name: 'Content-Type',
    type: 'string',
    required: true,
    description: 'Type de contenu de la requête',
    example: 'application/json'
  },
  {
    name: 'Accept-Language',
    type: 'string',
    required: false,
    description: 'Langue préférée pour la réponse',
    example: 'fr-FR'
  }
]

// Codes d'erreur
const errorCodes = [
  {
    code: '401',
    status: '401 Unauthorized',
    description: 'Token d\'authentification manquant ou invalide'
  },
  {
    code: '403',
    status: '403 Forbidden',
    description: 'Accès interdit pour cette structure'
  },
  {
    code: '404',
    status: '404 Not Found',
    description: 'Endpoint non trouvé'
  },
  {
    code: '429',
    status: '429 Too Many Requests',
    description: 'Trop de requêtes, limite de taux dépassée'
  },
  {
    code: '500',
    status: '500 Internal Server Error',
    description: 'Erreur interne du serveur'
  }
]

// Méthodes
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  // Optionnel : ajouter un toast de confirmation
}

const scrollToSection = (id: string) => {
  activeSection.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const testEndpoint = async () => {
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
          dateCreation: '2025-01-15T10:30:00Z'
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      }
    }
  }, null, 2)
  
  isLoading.value = false
}

// Observer les sections pour le menu actif
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 }
  )

  menuItems.forEach(item => {
    const element = document.getElementById(item.id)
    if (element) observer.observe(element)
  })
})
</script>

<style scoped>
.prose p {
  margin-bottom: 0.75rem;
}

.prose strong {
  color: #1e293b;
}
</style>