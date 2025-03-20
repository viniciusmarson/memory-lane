import { useCallback } from 'react'
import { MemoryUpdate, NewMemory } from '../types/memory'
import { useAlert } from '../hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import MemoriesService from '../services/memories'
import MemoryForm from '../components/forms/MemoryForm'

export default function NewMemoryPage() {
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  const handleSubmit = useCallback(
    async (memory: NewMemory | MemoryUpdate) => {
      if (!('image' in memory)) {
        showAlert('Image is required', 'error', 3000)
        return
      }

      try {
        await MemoriesService.createMemory(memory)
        navigate('/')
      } catch (error) {
        showAlert('Error creating memory', 'error', 3000)
      }
    },
    [navigate, showAlert]
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
