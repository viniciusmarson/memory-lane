import { useCallback } from 'react'
import { MemoriesPageContext } from '../context'
import { useContextSelector } from 'use-context-selector'

export default function PaginationControls() {
  const total = useContextSelector(MemoriesPageContext, (s) => s.total)

  const currentPage = useContextSelector(MemoriesPageContext, (s) => s.page)

  const currentLimit = useContextSelector(MemoriesPageContext, (s) => s.limit)

  const setPage = useContextSelector(MemoriesPageContext, (s) => s.setPage)

  const setLimit = useContextSelector(MemoriesPageContext, (s) => s.setLimit)

  const totalPages = Math.ceil(total / currentLimit)

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage]
  )

  const handleLimitChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newLimit = Number(e.target.value)
      setLimit(newLimit)
    },
    [setLimit]
  )

  const getPageNumbers = useCallback(() => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible pages
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }, [totalPages, currentPage])

  if (total === 0) return null

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex items-center gap-4'>
        <select
          value={currentLimit}
          onChange={handleLimitChange}
          className='border rounded px-2 py-1'
        >
          <option value='5'>5 per page</option>
          <option value='10'>10 per page</option>
          <option value='20'>20 per page</option>
          <option value='50'>50 per page</option>
        </select>

        <span className='text-sm text-gray-500'>
          Showing {(currentPage - 1) * currentLimit + 1} to{' '}
          {Math.min(currentPage * currentLimit, total)} of {total} entries
        </span>
      </div>

      <div className='flex gap-2 items-center'>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400'
              : 'hover:bg-gray-100'
          }`}
        >
          First
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400'
              : 'hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        <div className='flex gap-1'>
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className='px-3 py-1'>
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400'
              : 'hover:bg-gray-100'
          }`}
        >
          Last
        </button>
      </div>
    </div>
  )
}
