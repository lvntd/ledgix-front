import { z } from 'zod'

export type PaginationInput = {
  page: number
  limit: number
}

export type InfiniteScrollPaginationInput = Omit<PaginationInput, 'skip'>
export type InfiniteScrollInput<Input> = {
  pageParam?: number
  input: Input
}

export type SortInput = {
  direction: 'asc' | 'desc'

  /**
   * The name of a property to sort by.
   * Predefined on the server side.
   */
  sort: string
}

export type SearchInput = {
  searchValue: string
}

export const createListQueryParams = (input: PaginationInput & SearchInput & SortInput) => {
  const params = new URLSearchParams({
    direction: input.direction,
    limit: input.limit.toString(),
    page: input.page.toString(),
    sort: input.sort
  })

  const searchValue = input.searchValue.trim()
  const minSearchSymbols = 3
  if (searchValue.length > minSearchSymbols) {
    params.set('searchValue', searchValue)
  }

  return params
}

export const TPaginationData = z.object({
  total: z.number(),
  page: z.number(),
  lastPage: z.number(),
  limit: z.number()
})

export type IPaginationData = z.infer<typeof TPaginationData>
