import { useCallback, useState } from 'react'
import { isNotValidDate, isFutureDate } from '../../utils/date'
import { NewMemory, MemoryUpdate, Memory } from '../../types/memory'

type MemoryFormProps = {
  submitText: string
  memory?: Memory
  onSubmit: (memory: NewMemory | MemoryUpdate) => Promise<void>
  onCancel: () => void
}

const ONE_MB = 1024 * 1024
const MAX_FILE_SIZE = 5

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
  const [errors, setErrors] = useState<string | null>(null)

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
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const fileSizeMB = file.size / ONE_MB

        if (fileSizeMB > MAX_FILE_SIZE) {
          setErrors(
            `File size exceeds ${MAX_FILE_SIZE}MB. File size: ${fileSizeMB.toFixed(
              2
            )} MB`
          )
          return
        }

        setErrors(null)
        setImage(file)
      }
    },
    [setImage]
  )

  const handleChangeTimestamp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = e.target.value
      setTimestamp(dateString)

      if (isNotValidDate(dateString)) {
        setErrors('Invalid date')
        return
      }

      if (isFutureDate(dateString)) {
        setErrors('Date cannot be in the future')
        return
      }

      setErrors(null)
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

      {errors && <p className='text-red-500'>{errors}</p>}

      <div className='flex justify-end gap-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          disabled={!!errors}
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
