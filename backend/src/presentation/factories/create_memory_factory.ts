import { CreateMemoryController } from '@presentation/controllers/create_memory_controller';
import { CreateMemoryUseCase } from '@domain/use-cases/create_memory/create_memory_use_case';
import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';

export const createMemoryFactory = (): CreateMemoryController => {
  const memoryRepository = new SQLiteMemoryRepository();
  const createMemoryUseCase = new CreateMemoryUseCase(memoryRepository);
  return new CreateMemoryController(createMemoryUseCase);
};
