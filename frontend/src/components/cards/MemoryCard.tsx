import { useCallback } from 'react'
import { Memory } from '../../types/memory'
import { formatDate } from '../../utils/date_format'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

type MemoryCardProps = Memory & {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function MemoryCard({
  id,
  title,
  description,
  filename,
  url,
  timestamp,
  onDelete,
  onEdit,
}: MemoryCardProps) {
  const handleEdit = useCallback(() => {
    onEdit(id)
  }, [onEdit, id])

  const handleDelete = useCallback(() => {
    onDelete(id)
  }, [onDelete, id])

  return (
    <div className='flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-130 w-80'>
      <div className='relative w-full h-64'>
        <img alt={filename} src={url} className='w-full h-full object-cover' />
      </div>

      <div className='flex flex-col gap-2 p-5'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <p className='text-gray-600 mb-1'>{formatDate(timestamp)}</p>
        <p className='text-black'>{description}</p>
      </div>

      <div className='flex gap-2 mt-auto mb-2 justify-center'>
        <button
          className='text-black bg-transparent px-4 py-2 flex items-center gap-2'
          onClick={handleEdit}
        >
          <PencilIcon className='size-4' />
          Edit
        </button>

        <button
          className='text-black bg-transparent px-4 py-2 flex items-center gap-2'
          onClick={handleDelete}
        >
          <TrashIcon className='size-4' />
          Delete
        </button>
      </div>
    </div>
  )
}
