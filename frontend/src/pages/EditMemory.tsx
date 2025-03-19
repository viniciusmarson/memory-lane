import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MemoriesService from '../services/memories'
import MemoryForm from '../components/forms/MemoryForm'
import { Memory, MemoryUpdate } from '../types/memory'

export default function EditMemoryPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [memory, setMemory] = useState<Memory | null>(null)

  useEffect(() => {
    if (!id) return
    MemoriesService.getMemory(Number(id)).then(setMemory)
  }, [id])

  const handleSubmit = useCallback(
    async (memory: MemoryUpdate) => {
      if (!id) return

      await MemoriesService.updateMemory(Number(id), memory)

      navigate('/')
    },
    [navigate, id]
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
