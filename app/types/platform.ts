export interface MockApp {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  environment: 'sandbox' | 'production'
  baseUrl: string
}

export interface MockApiKey {
  id: string
  clientId: string
  secret: string
  name: string
  appId: string
  status: 'active' | 'revoked' | 'expired'
  createdAt: string
  expiresAt: string
  lastUsedAt: string | null
  permissions: string[]
}

export interface MockLogEntry {
  id: string
  timestamp: string
  method: string
  endpoint: string
  statusCode: number
  latency: number
  clientId: string
  description: string
}

export interface MockStats {
  totalRequests: number
  successRate: number
  avgLatency: number
  activeApps: number
  requestsToday: number
  errorsToday: number
}

export interface ApiEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  title: string
  description: string
  category: string
  parameters: ApiParameter[]
  requestBody?: ApiRequestBody
  responseExample: string
  statusCode: number
}

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
  example: string
}

export interface ApiRequestBody {
  contentType: string
  schema: string
  example: string
}

export interface DocSection {
  id: string
  title: string
  icon: string
  children?: DocSection[]
}
