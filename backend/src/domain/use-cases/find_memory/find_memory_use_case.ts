import { Memory } from '@domain/types/memory';
import { IMemoryRepository } from '@domain/repositories/memory_repository';
import { FindMemoryRequestDTO } from './find_memory_request_dto';

export class FindMemoryUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: FindMemoryRequestDTO): Promise<Memory> {
    const memory = await this.memoryRepository.getMemory(dto.id);
    return memory;
  }
}
