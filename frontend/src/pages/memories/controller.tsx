import { useAlert } from '@hooks/useAlert'
import { Memory, Sort } from '@types/memory'
import { useNavigate } from 'react-router-dom'
import { MemoriesPageContext } from './context'
import MemoriesService from '@services/memories'
import { MemoriesPageControllerProps } from './types'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const MemoriesPageController = (
  props: MemoriesPageControllerProps
): JSX.Element => {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState<Sort>('oldest')

  const [memories, setMemories] = useState<Memory[]>([])
  const [error, setError] = useState<string | null>(null)
  const [deleteMemoryId, setDeleteMemoryId] = useState<number | null>(null)

  const fetchMemories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { memories, total } = await MemoriesService.getMemories(
        sort,
        page,
        limit
      )
      setMemories(memories)
      setTotal(total)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setLoading(false)
    }
  }, [sort, page, limit])

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories, sort])

  const handleEdit = useCallback(
    (id: number) => {
      navigate(`/edit-memory/${id}`)
    },
    [navigate]
  )

  const handleDelete = useCallback(
    (id: number) => {
      setDeleteMemoryId(id)
    },
    [setDeleteMemoryId]
  )

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteMemoryId) return

    try {
      await MemoriesService.deleteMemory(deleteMemoryId)
      setDeleteMemoryId(null)
      showAlert('Memory deleted successfully', 'success', 3000)
      fetchMemories()
    } catch (error) {
      showAlert('Failed to delete memory', 'error', 3000)
    }
  }, [fetchMemories, deleteMemoryId, showAlert])

  const handleCancelDelete = useCallback(() => {
    setDeleteMemoryId(null)
  }, [setDeleteMemoryId])

  const state = useMemo(
    () => ({
      loading,
      error,
      memories,
      total,
      sort,
      page,
      limit,
      deleteMemoryId,
      setSort,
      setPage,
      setLimit,
      handleEdit,
      handleDelete,
      handleConfirmDelete,
      handleCancelDelete,
    }),
    [
      loading,
      error,
      memories,
      total,
      sort,
      page,
      limit,
      deleteMemoryId,
      setSort,
      setPage,
      setLimit,
      handleEdit,
      handleDelete,
      handleConfirmDelete,
      handleCancelDelete,
    ]
  )

  return (
    <MemoriesPageContext.Provider value={state}>
      {props.children}
    </MemoriesPageContext.Provider>
  )
}
