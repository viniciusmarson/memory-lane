import { Memory, Sort } from '@types/memory'

export type MemoriesPageControllerProps = {
  children: JSX.Element
}

export type MemoriesPageContextProps = {
  loading: boolean
  error: string | null
  sort: Sort
  page: number
  limit: number
  total: number
  memories: Memory[]
  deleteMemoryId: number | null
  setSort: (sort: Sort) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
}
