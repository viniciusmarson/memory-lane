import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import MemoriesService from '../services/memories'
import MemoryForm from '../components/forms/MemoryForm'
import { NewMemory } from '../types/memory'

export default function NewMemoryPage() {
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (memory: NewMemory) => {
      await MemoriesService.createMemory(memory)

      navigate('/')
    },
    [navigate]
  )

  const handleCancel = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <MemoryForm
      submitText='Create'
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
