import { Memory, Sort } from '@types/memory'

export type MemoriesPageControllerProps = {
  children: JSX.Element
}

export type MemoriesPageContextProps = {
  loading: boolean
  error: string | null
  sort: Sort
  memories: Memory[]
  deleteMemoryId: number | null
  setSort: (sort: Sort) => void
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
}
