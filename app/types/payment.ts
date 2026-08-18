export interface Payment {
  id: number
  code: string
  phone: string
  amount: number
  status: PaymentStatus
  first_name: string | null
  last_name: string | null
  speciality: string
  speciality_id?: number
  type: string
  type_speciality_id?: number
  praticien: string
  praticien_id?: number | null
  user_id?: number
  paid_at: string
  created_at: string
  validated_at: string | null
  canceled_at: string | null
  expiry_at: string | null
  validateur: string | null
  user: string
  namespace?: string
  consultation?: string
  service?: string
}

export type PaymentStatus = 'paid' | 'to_validate' | 'to_canceled' | 'expired'

export interface PaymentsParams {
  page?: number
  namespace?: string
  search?: string
  speciality?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  last_page: number
  total?: number
}
