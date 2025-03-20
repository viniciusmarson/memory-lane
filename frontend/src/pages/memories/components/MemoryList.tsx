import { MemoriesPageContext } from '../context'
import { useContextSelector } from 'use-context-selector'
import MemoryCard from '../../../components/cards/MemoryCard'

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

      <div className='flex flex-wrap gap-8 justify-center md:justify-start'>
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            {...memory}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  )
}
