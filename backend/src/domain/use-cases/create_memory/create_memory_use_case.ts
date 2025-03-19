import { IMemoryRepository } from '@domain/repositories/memory_repository';
import { CreateMemoryRequestDTO } from './create_memory_request_dto';

export class CreateMemoryUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: CreateMemoryRequestDTO): Promise<void> {
    await this.memoryRepository.createMemory(dto);
  }
}
