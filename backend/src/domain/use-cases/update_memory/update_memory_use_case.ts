import { IMemoryRepository } from '@domain/repositories/memory_repository';
import { UpdateMemoryRequestDTO } from './update_memory_request_dto';

export class UpdateMemoryUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: UpdateMemoryRequestDTO): Promise<void> {
    await this.memoryRepository.updateMemory(dto);
  }
}
