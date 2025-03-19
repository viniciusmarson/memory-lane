import { useCallback } from 'react'
import { Sort } from '@types/memory'
import { MemoriesPageContext } from '../context'
import { useContextSelector } from 'use-context-selector'

export default function SortMemoriesButton() {
  const sort = useContextSelector(MemoriesPageContext, (s) => s.sort)
  const setSort = useContextSelector(MemoriesPageContext, (s) => s.setSort)

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value as Sort)
    },
    [setSort]
  )

  return (
    <select
      value={sort}
      onChange={handleSortChange}
      className='text-black bg-white rounded-md p-2 border border-gray-300'
    >
      <option value='oldest'>Older to newer</option>
      <option value='newest'>Newer to older</option>
    </select>
  )
}
