import { MemoriesPageContext } from '../context'
import { useContextSelector } from 'use-context-selector'
import MemoryCard from '../../../components/cards/MemoryCard'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'

export default function MemoryList() {
  const error = useContextSelector(MemoriesPageContext, (s) => s.error)
  const loading = useContextSelector(MemoriesPageContext, (s) => s.loading)
  const memories = useContextSelector(MemoriesPageContext, (s) => s.memories)

  const handleEdit = useContextSelector(
    MemoriesPageContext,
    (s) => s.handleEdit
  )

  const handleDelete = useContextSelector(
    MemoriesPageContext,
    (s) => s.handleDelete
  )

  return (
    <>
      {loading && <div className='text-center'>Loading...</div>}
      {error && <div className='text-center text-red-500'>{error}</div>}

      <div className='flex flex-col md:flex-row gap-2 items-center'>
        {memories.map((memory) => (
          <div
            key={memory.id}
            className='flex flex-col md:flex-row gap-2 items-center'
          >
            <MemoryCard
              {...memory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <EllipsisHorizontalCircleIcon className='size-6' />
          </div>
        ))}
      </div>
    </>
  )
}
