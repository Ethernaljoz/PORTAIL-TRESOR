import type { ColumnDef, ColumnFiltersState, PaginationState, RowSelectionState, SortingState, VisibilityState } from '@tanstack/vue-table'
import { useQuery } from '@tanstack/vue-query'
import {
  getCoreRowModel,
  useVueTable,

} from '@tanstack/vue-table'
import { computed, ref, watch } from 'vue'

export interface FetchParams {
  page: number
  pageSize: number
  search: string
  sorting: SortingState
  filters: ColumnFiltersState
  dateRange: { start: string | null, end: string | null }
}

export interface FetchResult<TData> {
  data: TData[]
  total: number
  pageCount: number
  amount?: number | null
}

export interface UseServerDataTableOptions<TData> {
  queryKey: string | string[]
  fetcher: (params: FetchParams) => Promise<FetchResult<TData>>
  columns: ColumnDef<TData, any>[]
  initialPageSize?: number
  staleTime?: number
}

export function useServerDataTable<TData>(options: UseServerDataTableOptions<TData>) {
  const {
    queryKey,
    fetcher,
    columns,
    initialPageSize = 10,
    staleTime = 30_000,
  } = options

  // ─── State ────────────────────────────────────────────────────────
  const globalFilter = ref('')
  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: initialPageSize })
  const columnVisibility = ref<VisibilityState>({})
  const rowSelection = ref<RowSelectionState>({})
  const dateRange = ref<{ start: string | null, end: string | null }>({ start: null, end: null })

  // Reset page to 0 when filters or sorting change
  watch([globalFilter, sorting, columnFilters, dateRange], () => {
    pagination.value.pageIndex = 0
  })

  // Refetch when any query parameter changes (including pagination)
  watch([globalFilter, sorting, columnFilters, dateRange, () => pagination.value.pageIndex], () => {
    refetch()
  })

  // ─── Query Key ────────────────────────────────────────────────────
  const reactiveQueryKey = computed(() => [
    ...(Array.isArray(queryKey) ? queryKey : [queryKey]),
    {
      page: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
      search: globalFilter.value,
      sorting: sorting.value,
      filters: columnFilters.value,
      dateRange: dateRange.value,
    },
  ])

  // ─── Data Fetching ─────────────────────────────────────────────────
  const { data, isLoading: queryIsLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: reactiveQueryKey,
    queryFn: () =>
      fetcher({
        page: pagination.value.pageIndex,
        pageSize: pagination.value.pageSize,
        search: globalFilter.value,
        sorting: sorting.value,
        filters: columnFilters.value,
        dateRange: dateRange.value,
      }),
    staleTime,
    placeholderData: previousData => previousData,
  })

  const tableData = computed(() => data.value?.data ?? [])
  const pageCount = computed(() => data.value?.pageCount ?? 0)
  const total = computed(() => data.value?.total ?? 0)
  const amount = ref<number | null>(null)
  watch(data, (newData) => {
    if (newData) {
      amount.value = newData.amount ?? null
    }
  }, { immediate: true })

  // ─── TanStack Table Instance ────────────────────────────────────────
  const table = useVueTable({
    data: tableData,
    get columns() { return columns },
    get pageCount() { return pageCount.value },
    state: {
      get sorting() { return sorting.value },
      get columnFilters() { return columnFilters.value },
      get globalFilter() { return globalFilter.value },
      get pagination() { return pagination.value },
      get columnVisibility() { return columnVisibility.value },
      get rowSelection() { return rowSelection.value },
    },
    onSortingChange: (updater) => {
      sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    },
    onColumnFiltersChange: (updater) => {
      columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater
    },
    onGlobalFilterChange: (val) => { globalFilter.value = val },
    onPaginationChange: (updater) => {
      pagination.value = typeof updater === 'function' ? updater(pagination.value) : updater
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater
    },
    onRowSelectionChange: (updater) => {
      rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  })

  const isLoading = computed(() => queryIsLoading.value || isFetching.value)

  return {
    table,
    globalFilter,
    sorting,
    columnFilters,
    pagination,
    columnVisibility,
    rowSelection,
    dateRange,
    // Query state
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    total,
    pageCount,
    amount,
  }
}
