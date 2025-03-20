import { PaginatedMemories } from '@domain/types/memory';
import { ListMemoriesRequestDTO } from './list_memories_request_dto';
import { IMemoryRepository } from '@domain/repositories/memory_repository';

export class ListMemoriesUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: ListMemoriesRequestDTO): Promise<PaginatedMemories> {
    const memories = await this.memoryRepository.getMemories(
      dto.sort,
      dto.page,
      dto.limit,
    );
    return memories;
  }
}
