export interface FilterOption {
  label: string
  value: string | boolean | number
  icon?: any
}

export interface FilterConfig {
  column: string
  title: string
  options: FilterOption[]
  type?: 'single' | 'multiple'
}
