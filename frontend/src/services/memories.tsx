import axios, { AxiosInstance } from 'axios'

import {
  NewMemory,
  Memory,
  MemoryUpdate,
  Sort,
  PaginatedMemories,
} from '../types/memory'

class MemoriesService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4001',
    })
  }

  async getMemories(
    sort: Sort,
    page: number,
    limit: number
  ): Promise<PaginatedMemories> {
    const response = await this.axiosInstance.get('/memories', {
      params: { sort, page, limit },
    })
    return response.data
  }

  async getMemory(id: number): Promise<Memory> {
    const response = await this.axiosInstance.get(`/memories/${id}`)
    return response.data
  }

  async createMemory(memory: NewMemory) {
    const formData = new FormData()

    Object.entries(memory).forEach(([key, value]) => {
      if (
        value &&
        typeof value === 'object' &&
        'name' in value &&
        'size' in value
      ) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })

    const response = await this.axiosInstance.post('/memories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  async deleteMemory(id: number) {
    const response = await this.axiosInstance.delete(`/memories/${id}`)
    return response.data
  }

  async updateMemory(id: number, memory: MemoryUpdate) {
    const response = await this.axiosInstance.put(`/memories/${id}`, memory)
    return response.data
  }
}

export default new MemoriesService()
