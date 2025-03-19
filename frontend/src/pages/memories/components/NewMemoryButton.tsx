import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import DefaultButton from '@components/buttons/Default'

type NewMemoryButtonProps = {
  url: string
}

export default function NewMemoryButton({ url }: NewMemoryButtonProps) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(url)
  }, [navigate, url])

  return (
    <DefaultButton onClick={handleClick}>
      <PlusIcon className='size-4' />
      New memory
    </DefaultButton>
  )
}
