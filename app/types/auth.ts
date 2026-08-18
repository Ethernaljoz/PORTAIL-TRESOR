export interface UserGrant {
  dashboard: boolean
  payments: boolean
  validate: boolean
  specialities: {
    list: boolean
    create: boolean
    update: boolean
    delete: boolean
  }
  praticiens: {
    list: boolean
    create: boolean
    update: boolean
    delete: boolean
  }
  verify: {
    list: boolean
    check: boolean
    create: boolean
  }
  users: {
    list: boolean
    create: boolean
    update: boolean
    delete: boolean
    grant: boolean
  }
  log: boolean
  statistics_payment: boolean
  chiffre: boolean
}

export interface User {
  id: number
  email: string
  last_name: string
  first_name: string
  phone: string
  profile: '1' | '2'
  token: string
  grant: UserGrant
}

export interface LoginResponse {
  status: boolean
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}
