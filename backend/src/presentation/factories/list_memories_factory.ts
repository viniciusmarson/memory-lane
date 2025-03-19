import { SQLiteMemoryRepository } from '@data/repositories/sqlite_memory_repository';
import { ListMemoriesController } from '@presentation/controllers/list_memories_controller';
import { ListMemoriesUseCase } from '@domain/use-cases/list_memories/list_memories_use_case';

export const listMemoriesFactory = (): ListMemoriesController => {
  const memoryRepository = new SQLiteMemoryRepository();
  const listMemoriesUseCase = new ListMemoriesUseCase(memoryRepository);
  return new ListMemoriesController(listMemoriesUseCase);
};
