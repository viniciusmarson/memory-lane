import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MemoriesService from '../services/memories'
import MemoryForm from '../components/forms/MemoryForm'
import { Memory, MemoryUpdate } from '../types/memory'
import { useAlert } from '../hooks/useAlert'

export default function EditMemoryPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { showAlert } = useAlert()
  const [memory, setMemory] = useState<Memory | null>(null)

  useEffect(() => {
    if (!id) return
    MemoriesService.getMemory(Number(id)).then(setMemory)
  }, [id])

  const handleSubmit = useCallback(
    async (memory: MemoryUpdate) => {
      if (!id) return

      try {
        await MemoriesService.updateMemory(Number(id), memory)
        navigate('/')
      } catch (error) {
        showAlert('Error updating memory', 'error', 3000)
      }
    },
    [navigate, id, showAlert]
  )

  const handleCancel = useCallback(() => {
    navigate('/')
  }, [navigate])

  if (!memory) return <div>Loading...</div>

  return (
    <MemoryForm
      submitText='Update'
      memory={memory}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
