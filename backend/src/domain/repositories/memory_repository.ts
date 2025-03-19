import { Memory } from '@domain/types/memory';

export interface IMemoryRepository {
  getMemories(sort: string): Promise<Memory[]>;
  getMemory(id: number): Promise<Memory>;
  createMemory(memory: Partial<Memory>): Promise<void>;
  updateMemory(memory: Partial<Memory>): Promise<void>;
  deleteMemory(id: number): Promise<void>;
}