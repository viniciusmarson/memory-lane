import { Memory } from '@domain/types/memory';
import { IMemoryRepository } from '@domain/repositories/memory_repository';
import { ListMemoriesRequestDTO } from './list_memories_request_dto';

export class ListMemoriesUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: ListMemoriesRequestDTO): Promise<Memory[]> {
    const memories = await this.memoryRepository.getMemories(dto.sort);
    return memories;
  }
}
