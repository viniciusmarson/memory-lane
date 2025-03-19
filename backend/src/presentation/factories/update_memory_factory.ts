import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';
import { UpdateMemoryUseCase } from '@domain/use-cases/update_memory/update_memory_use_case';
import { UpdateMemoryController } from '@presentation/controllers/update_memory_controller';

export const updateMemoryFactory = () => {
  const memoryRepository = new SQLiteMemoryRepository();
  const updateMemoryUseCase = new UpdateMemoryUseCase(memoryRepository);
  return new UpdateMemoryController(updateMemoryUseCase);
};
