import { Memory, PaginatedMemories } from '@domain/types/memory';

export interface IMemoryRepository {
  getMemory(id: number): Promise<Memory>;
  deleteMemory(id: number): Promise<void>;
  createMemory(memory: Partial<Memory>): Promise<void>;
  updateMemory(memory: Partial<Memory>): Promise<void>;
  getMemories(
    sort: string,
    page: number,
    limit: number,
  ): Promise<PaginatedMemories>;
}
