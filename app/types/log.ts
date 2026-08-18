export interface LogEntry {
  id: number
  module: string
  action: string
  user: string
  user_name?: string
  code: string
  message: string
  created_at: string
}
