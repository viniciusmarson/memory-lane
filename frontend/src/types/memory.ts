export type Memory = {
  id: number
  title: string
  description: string
  filename: string
  url: string
  timestamp: string
}

export type NewMemory = {
  title: string
  description: string
  timestamp: string
}

export type MemoryUpdate = Partial<NewMemory>

export type Sort = 'newest' | 'oldest'
