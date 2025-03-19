import { DeleteMemoryUseCase } from '@domain/use-cases/delete_memory/delete_memory_use_case';
import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';
import { DeleteMemoryController } from '@presentation/controllers/delete_memory_controller';

export const deleteMemoryFactory = (): DeleteMemoryController => {
  const memoryRepository = new SQLiteMemoryRepository();
  const deleteMemoryUseCase = new DeleteMemoryUseCase(memoryRepository);
  return new DeleteMemoryController(deleteMemoryUseCase);
};
