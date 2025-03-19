import { MemoriesPageContext } from '../context'
import DangerModal from '@components/modals/DangerModal'
import { useContextSelector } from 'use-context-selector'

export default function DeleteMemoryModal() {
  const deleteMemoryId = useContextSelector(
    MemoriesPageContext,
    (s) => s.deleteMemoryId
  )

  const handleConfirmDelete = useContextSelector(
    MemoriesPageContext,
    (s) => s.handleConfirmDelete
  )

  const handleCancelDelete = useContextSelector(
    MemoriesPageContext,
    (s) => s.handleCancelDelete
  )

  if (!deleteMemoryId) return null

  return (
    <DangerModal
      title='Delete memory'
      description='Are you sure you want to delete this memory? This action cannot be undone.'
      actionText='Delete'
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  )
}
