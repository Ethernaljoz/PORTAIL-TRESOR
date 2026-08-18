export interface User {
  id: number
  name: string
  email: string
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  status: boolean
  user: User
}
