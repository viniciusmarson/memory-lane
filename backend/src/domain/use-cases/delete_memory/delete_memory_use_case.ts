import { IMemoryRepository } from '@domain/repositories/memory_repository';
import { DeleteMemoryRequestDTO } from './delete_memory_request_dto';

export class DeleteMemoryUseCase {
  constructor(private readonly memoryRepository: IMemoryRepository) {}

  async execute(dto: DeleteMemoryRequestDTO): Promise<void> {
    await this.memoryRepository.deleteMemory(dto.id);
  }
}
