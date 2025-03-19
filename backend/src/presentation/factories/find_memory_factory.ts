import { FindMemoryUseCase } from '@domain/use-cases/find_memory/find_memory_use_case';
import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';
import { FindMemoryController } from '@presentation/controllers/find_memory_controller';

export const findMemoryFactory = (): FindMemoryController => {
  const memoryRepository = new SQLiteMemoryRepository();
  const findMemoryUseCase = new FindMemoryUseCase(memoryRepository);
  return new FindMemoryController(findMemoryUseCase);
};
