import { useCallback, useState } from 'react'
import { NewMemory, MemoryUpdate, Memory } from '../../types/memory'

type MemoryFormProps = {
  submitText: string
  memory?: Memory
  onSubmit: (memory: NewMemory | MemoryUpdate) => Promise<void>
  onCancel: () => void
}

export default function MemoryForm({
  submitText,
  memory,
  onSubmit,
  onCancel,
}: MemoryFormProps) {
  const [title, setTitle] = useState(memory?.title || '')
  const [description, setDescription] = useState(memory?.description || '')
  const [image, setImage] = useState<File | null>(null)
  const [timestamp, setTimestamp] = useState(
    memory?.timestamp || new Date().toISOString().split('T')[0]
  )

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    [setTitle]
  )

  const handleChangeDescription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value)
    },
    [setDescription]
  )

  const handleChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.files?.[0] || null)
    },
    [setImage]
  )

  const handleChangeTimestamp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimestamp(e.target.value)
    },
    [setTimestamp]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await onSubmit({
        title,
        description,
        timestamp,
        image: image || undefined,
      })
    },
    [title, description, image, timestamp, onSubmit]
  )

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  return (
    <form onSubmit={handleSubmit}>
      <label className='block text-sm font-medium text-gray-700'>Title</label>
      <input
        type='text'
        value={title}
        onChange={handleChangeTitle}
        placeholder='Title'
        required
      />

      <label className='block text-sm font-medium text-gray-700'>
        Description
      </label>
      <input
        type='text'
        value={description}
        onChange={handleChangeDescription}
        placeholder='Description'
        required
      />

      {!memory && (
        <>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <input type='file' onChange={handleChangeImage} required />
        </>
      )}

      <label className='block text-sm font-medium text-gray-700'>
        Timestamp
      </label>
      <input
        type='date'
        value={timestamp}
        onChange={handleChangeTimestamp}
        required
      />

      <div className='flex justify-end gap-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
        >
          {submitText}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
